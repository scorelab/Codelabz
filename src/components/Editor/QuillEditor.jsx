import React, { useEffect, useRef, useState } from "react";
import "../../css/quillEditor.css";
import { useFirebase } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { Prompt } from "react-router-dom";
import { setCurrentStep } from "../../store/actions";
import * as Y from "yjs";
import { QuillBinding } from "y-quill";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import { FirestoreProvider, getColor } from "@gmcfall/yjs-firestore-provider";

import { onlineFirebaseApp } from "../../config";

Quill.register("modules/cursors", QuillCursors);

const QuillEditor = ({ id, data, tutorial_id }) => {
  const [allSaved, setAllSaved] = useState(true);
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  let noteID = id || "test_note";
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const basePath = ["cl_codelabz", "organization", "codelabzorg", tutorial_id];
  var provider, binding;
  var ydoc;

  const currentUserHandle = useSelector(
    ({
      firebase: {
        profile: { handle }
      }
    }) => handle
  );

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
  }, [id]);

  useEffect(() => {
    try {
      if (!ydoc) {
        ydoc = new Y.Doc();

        // on updating text in editor this gets triggered
        ydoc.on("update", () => {
          const deltaText = ydoc.getText("quill").toDelta();
          setCurrentStep(deltaText)(dispatch);
        });
        provider = new FirestoreProvider(onlineFirebaseApp, ydoc, basePath, {
          disableAwareness: true
        });
      }
      const ytext = ydoc.getText("quill");
      const container = containerRef.current;

      // Clear all extra divs except the editor
      while (
        container.firstChild &&
        container.firstChild !== editorRef.current
      ) {
        container.removeChild(container.firstChild);
      }

      const editor = new Quill(editorRef.current, {
        modules: {
          cursors: true,
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ["image", "code-block"]
          ],
          history: {
            userOnly: true
          }
        },
        placeholder: "Start collaborating...",
        theme: "snow"
      });

      // provider.awareness.setLocalStateField("user", {
      //   name: currentUserHandle,
      //   color: getColor(currentUserHandle)
      // });

      binding = new QuillBinding(ytext, editor, provider.awareness);
    } catch (err) {
      console.log(err);
    }

    return () => {
      try {
        binding.destroy();
      } catch (err) {
        console.log(err);
      }
    };
  }, []);

  return (
    <div style={{ flexGrow: 1 }}>
      <Prompt
        when={!allSaved}
        message="You have unsaved changes, are you sure you want to leave?"
      />
      <div
        ref={containerRef}
        style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}
      >
        <div id="quill-editor" ref={editorRef} style={{ flexGrow: 1 }} />
      </div>
    </div>
  );
};

export default QuillEditor;
