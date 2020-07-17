import React, { useEffect, useRef } from "react";
import "../../css/Editor.css";
import "firepad/dist/firepad.css";
import "codemirror/lib/codemirror.css";
import { useFirebase } from "react-redux-firebase";
import CodeMirror from "codemirror";

const Editor = () => {
  const firebase = useFirebase();
  const editorRef = useRef(null);

  useEffect(() => {
    let ref = firebase
      .database()
      .ref()
      .child("notes");

    const firepadRef = ref.child("secret_hash");

    const codeMirror = CodeMirror(editorRef.current, {
      lineWrapping: true,
      lineNumbers: true,
      mode: "javascript"
    });

    window.CodeMirror = CodeMirror;
    const Firepad = require("firepad");

    const firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
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
