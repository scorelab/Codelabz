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
    try {
      if (!ydoc) {
        // yjs document
        ydoc = new Y.Doc();

        // on updating text in editor this gets triggered
        ydoc.on("update", () => {
          // deltaText is quill editor's data structure to store text
          const deltaText = ydoc.getText("quill").toDelta();
          var config = {};
          var converter = new QuillDeltaToHtmlConverter(deltaText, config);

          var html = converter.convert();
          setCurrentStepContent(tutorial_id, id, html)(firestore, dispatch);
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
            [{ header: [1, 2,3,4,5,6,7, false] }],
            ['bold', 'italic', 'underline', 'strike'],  
            ['blockquote'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }], 
            [{ 'color': [] }, { 'background': [] }],          
            [{ 'font': [] }],
            [{ 'align': [] }],
            ["image", "code-block",'link'],
            ['clean']   
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
