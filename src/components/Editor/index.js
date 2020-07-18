import React, { useEffect, useRef } from "react";
import "../../css/Editor.css";
import "../../css/Firepad/firepad.css";
import "../../css/Firepad/firepad-userlist.css";
import "codemirror/lib/codemirror.css";
import { useFirebase } from "react-redux-firebase";
import CodeMirror from "codemirror";
import { useSelector } from "react-redux";

const Editor = () => {
  const firebase = useFirebase();
  const editorRef = useRef(null);
  const usersRef = useRef(null);

  const currentUserHandle = useSelector(
    ({
      firebase: {
        profile: { handle }
      }
    }) => handle
  );

  const displayName = useSelector(
    ({
      firebase: {
        profile: { displayName }
      }
    }) => displayName
  );

  useEffect(() => {
    let firepad;
    window.CodeMirror = CodeMirror;
    window.firebase = firebase;

    let ref = firebase
      .database()
      .ref()
      .child("notes");

    const codeMirror = CodeMirror(editorRef.current, {
      lineWrapping: true,
      lineNumbers: true,
      mode: { name: "javascript", json: true }
    });

    const script = document.createElement("script");
    script.src = "/firepad.js";
    script.async = true;
    script.onload = () => {
      const firepadRef = ref.child("test_note");

      firepad = window.Firepad.fromCodeMirror(firepadRef, codeMirror, {
        richTextToolbar: true,
        richTextShortcuts: true,
        userId: currentUserHandle
      });

      usersRef.current &&
        window.Firepad.FirepadUserList.fromDiv(
          firepadRef.child("users"),
          usersRef.current,
          currentUserHandle,
          displayName
        );

      firepad.on("ready", function() {
        if (firepad.isHistoryEmpty()) {
          firepad.setHtml(
            '<span style="font-size: 24px;">Rich-text editing with <span style="color: red">Firepad!</span></span><br/><br/>Collaborative-editing made easy.\n'
          );
        }
      });

      firepad.on("synced", function(isSynced) {
        console.log("isSynced", isSynced);
      });
    };

    document.body.appendChild(script);
    return () => {
      firepad && firepad.dispose();
      document.body.removeChild(script);
    };
  }, [firebase, currentUserHandle, displayName]);

  return (
    <div>
      <div id="firepad-userlist" ref={usersRef} />
      <div id="firepad-container" ref={editorRef} />
    </div>
  );
};

export default Editor;
