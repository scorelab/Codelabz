import React, { useEffect, useRef } from "react";
import "./Editor.css";
import { useFirebase } from "react-redux-firebase";

const Editor = () => {
  const firebase = useFirebase();
  const editorRef = useRef(null);

  useEffect(() => {
    let ref = firebase
      .database()
      .ref()
      .child("notes");

    const firepadRef = ref.child("secret_hash");

    const codeMirror = window.CodeMirror(editorRef.current, {
      lineWrapping: true,
      lineNumbers: true,
      mode: "javascript"
    });

    const firepad = window.Firepad.fromCodeMirror(firepadRef, codeMirror, {
      richTextToolbar: true,
      richTextShortcuts: true
    });

    firepad.on("ready", function() {
      if (firepad.isHistoryEmpty()) {
        firepad.setHtml(
          '<span style="font-size: 24px;">Rich-text editing with <span style="color: red">Firepad!</span></span><br/><br/>Collaborative-editing made easy.\n'
        );
      }
    });
  }, [firebase]);

  return (
    <div>
      <div id="firepad-container" ref={editorRef} />
    </div>
  );
};

export default Editor;
