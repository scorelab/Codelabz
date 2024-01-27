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
import { FirestoreProvider, getColor } from "@gmcfall/yjs-firestore-provider";
import { onlineFirebaseApp } from "../../config";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { Button, Typography } from "@mui/material";

Quill.register("modules/cursors", QuillCursors);

const QuillEditor = ({ id, data, tutorial_id }) => {
  const [allSaved, setAllSaved] = useState(true);
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  let noteID = id || "test_note";
  const firestore = useFirestore();
  const dispatch = useDispatch();
  // This path in cloud firestore contains yjs documents storing content of a step
  // (actual data used to render is present in "steps" collection in the same doc)
  const basePath = ["tutorials", tutorial_id, "yjsStepDocs", id];
  let provider, binding, ydoc;

  const currentUserHandle = useSelector(
    ({
      firebase: {
        profile: { handle }
      }
    }) => handle
  );

  useEffect(() => {
    setAllSaved(true);
  }, [id]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    try {
      if (!ydoc) {
        // console.log("Component Mounted");
        // yjs document
        ydoc = new Y.Doc();
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
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }], // text direction

            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],
            ["clean"], // remove formatting button
            ["link", "image"]
          ],
          history: {
            userOnly: true
          }
        },
        placeholder: "Start collaborating...",
        theme: "snow"
      });

      editor.on("text-change", function () {
        setAllSaved(false);
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
      document.removeEventListener("keydown", handleKeyDown);
      try {
        binding.destroy();
      } catch (err) {
        console.log(err);
      }
    };
  }, []);

  useEffect(() => {
    // console.log("second use effect that depends on deptencedy ");
    let updateTimer;

    // Set up a timer for delayed update to Firestore
    const scheduleUpdate = () => {
      clearTimeout(updateTimer);
      updateTimer = setTimeout(() => {
        const deltaText = ydoc.getText("quill").toDelta();
        const config = {};
        const converter = new QuillDeltaToHtmlConverter(deltaText, config);
        const html = converter.convert();
        setCurrentStepContent(
          tutorial_id,
          id,
          html,
          setAllSaved
        )(firestore, dispatch);
        setAllSaved(true); // Reset saved changes flag after update
      }, 10000); // 10 seconds in milliseconds
    };

    // Listen for changes in the Yjs document
    const ytext = ydoc.getText("quill");
    const observer = event => {
      // console.log("Yjs Update:", event);
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
    // console.log("Handle save Button YDOC", ydoc);
    const deltaText = ydoc.getText("quill").toDelta();
    // console.log("Delta text from Handle save Button :", deltaText);
    const config = {};
    const converter = new QuillDeltaToHtmlConverter(deltaText, config);
    const html = converter.convert();
    // console.log("Manually saving:", deltaText);
    setCurrentStepContent(
      tutorial_id,
      id,
      html,
      setAllSaved
    )(firestore, dispatch);
    // console.log("Manually saved");
    setAllSaved(true);
  };
  const handleKeyDown = event => {
    if (event.ctrlKey && event.key === "s") {
      event.preventDefault();
      handleSaveButtonClick();
    }
  };
  return (
    <div style={{ flexGrow: 1 }}>
      <Prompt
        when={!allSaved}
        message="You have unsaved changes, are you sure you want to leave?"
      />
      <div style={{ height: "15px" }}>
        {!allSaved && (
          <Typography style={{ fontSize: "12px" }}>
            Unsaved changes...
          </Typography>
        )}
      </div>

      <div
        ref={containerRef}
        style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}
      >
        <div id="quill-editor" ref={editorRef} style={{ flexGrow: 1 }} />
        {/* <div>
          <Button onClick={handleSaveButtonClick}>Save</Button>
        </div> */}
      </div>
    </div>
  );
};

export default QuillEditor;
