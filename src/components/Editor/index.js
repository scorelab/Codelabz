import React, { useEffect, useRef, useState } from "react";
import "../../css/firepad.css";
import "../../css/firepad-userlist.css";
import "../../css/codemirror.css";
import { useFirebase } from "react-redux-firebase";
import CodeMirror from "codemirror";
import { useSelector } from "react-redux";
import { Row, Col } from "antd";
import { Prompt } from "react-router-dom";

const Editor = ({ id }) => {
  const [allSaved, setAllSaved] = useState(true);
  const [synced, setSynced] = useState(false);

  const firebase = useFirebase();
  const editorRef = useRef(null);
  // const usersRef = useRef(null);
  let noteID = id || "test_note";

  const currentUserHandle = useSelector(
    ({
      firebase: {
        profile: { handle },
      },
    }) => handle
  );

  useEffect(() => {
    let firepad;
    window.CodeMirror = CodeMirror;
    window.firebase = firebase;

    let ref = firebase.database().ref().child("notes");

    const codeMirror = CodeMirror(editorRef.current, {
      lineWrapping: true,
      lineNumbers: true,
      mode: { name: "javascript", json: true },
    });

    const script = document.createElement("script");
    script.src = "/firepad.js";
    script.async = true;
    script.onload = () => {
      const firepadRef = ref.child("test_note");

      firepad = window.Firepad.fromCodeMirror(firepadRef, codeMirror, {
        richTextToolbar: false,
        richTextShortcuts: true,
        userId: currentUserHandle,
      });

      firepad.on("ready", function () {
        if (firepad.isHistoryEmpty()) {
          firepad.setHtml(
            '<span style="font-size: 24px;">Rich-text editing with <span style="color: red">Firepad!</span></span><br/><br/>Collaborative-editing made easy.\n'
          );
        }
      });

      firepad.on("synced", function (isSynced) {
        setSynced(isSynced);
      });
    };

    document.body.appendChild(script);
    return () => {
      firepad && firepad.dispose();
      document.body.removeChild(script);
    };
  }, [firebase, currentUserHandle]);

  useEffect(() => {
    setAllSaved(true);
    // const confirmBeforeExit = (e) => {
    //   e.preventDefault();
    //   e.returnValue = "";
    // };
    // window.addEventListener("beforeunload", confirmBeforeExit);

    return () => {
      // window.removeEventListener("beforeunload", confirmBeforeExit);
    };
  }, [noteID]);

  return (
    <div>
      <Prompt
        when={!allSaved}
        message="You have unsaved changes, are you sure you want to leave?"
      />
      <Row>
        <Col xs={24} md={24}>
          {synced ? "Saved as a draft" : "Saving..."}
          <div id="firepad-container" ref={editorRef} />
        </Col>
      </Row>
    </div>
  );
};

export default Editor;
