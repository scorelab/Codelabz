import React, { useEffect, useRef, useState } from "react";
import "../../css/quillEditor.css";
import { useFirestore } from "react-redux-firebase";
import { useDispatch, useSelector } from "react-redux";
import { Prompt } from "react-router-dom";
import { setCurrentStepContent } from "../../store/actions";
import * as Y from "yjs";
import { QuillBinding } from "y-quill";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import { FirestoreProvider } from "@gmcfall/yjs-firestore-provider";
import { onlineFirebaseApp } from "../../config";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

Quill.register("modules/cursors", QuillCursors);

const QuillEditor = ({ id, tutorial_id }) => {
  const [allSaved, setAllSaved] = useState(true);
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const basePath = ["tutorials", tutorial_id, "yjsStepDocs", id];
  let provider, binding, ydoc;


  useEffect(() => {
    setAllSaved(true);
  }, [id]);


   useEffect(() => {
    try {
      if (!ydoc) {
        ydoc = new Y.Doc();
        
        provider = new FirestoreProvider(onlineFirebaseApp, ydoc, basePath, {
          disableAwareness: true
        });
      }
      const ytext = ydoc.getText("quill");
      const container = containerRef.current;

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
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image"]
          ],
          history: {
            userOnly: true
          }
        },
        placeholder: "Start collaborating...",
        theme: "snow"
      });

      binding = new QuillBinding(ytext, editor, provider.awareness);

      // Handle text change event in Quill editor
      editor.on("text-change", () => {
        setAllSaved(false); // Set unsaved changes flag
      });
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
  }, [id]);

  useEffect(() => {
    let updateTimer;

    // Set up a timer for delayed update to Firestore
    const scheduleUpdate = () => {
      clearTimeout(updateTimer);
      updateTimer = setTimeout(() => {
        const deltaText = ydoc.getText("quill").toDelta();
        const config = {};
        const converter = new QuillDeltaToHtmlConverter(deltaText, config);
        const html = converter.convert();
        setCurrentStepContent(tutorial_id, id, html)(firestore, dispatch);
        setAllSaved(true); // Reset saved changes flag after update
      }, 15000); // 30 seconds in milliseconds
    };

    // Listen for changes in the Yjs document
    const ytext = ydoc.getText("quill");
    const observer = event => {
      console.log("Yjs Update:", event);
      scheduleUpdate(); // Trigger update on Yjs document changes
    };
    ytext.observe(observer);

    // Clean up observers
    return () => {
      clearTimeout(updateTimer);
      ytext.unobserve(observer);
    };
  }, [ydoc, dispatch, firestore, id, tutorial_id]);


  
  const handleSaveButtonClick = () => {
    if (ydoc) {
      const deltaText = ydoc.getText("quill").toDelta();
      const config = {};
      const converter = new QuillDeltaToHtmlConverter(deltaText, config);
      const html = converter.convert();
      console.log("Manually saving:", html);
      setCurrentStepContent(tutorial_id, id, html)(firestore, dispatch);
      setAllSaved(true);
    }
  };
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
      <button
       onClick={handleSaveButtonClick}
      >Save</button>
    </div>
  );
};

export default QuillEditor;
