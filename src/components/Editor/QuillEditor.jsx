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
  let provider, binding, ydoc, quill;

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

      quill = new Quill(editorRef.current, {
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
          },
          clipboard: {
            matchers: [
              // Custom matcher to handle pasted image URLs
              [
                Node.TEXT_NODE,
                (node, delta) => {
                  const regex = /\!\[.*\]\((https?:\/\/[^\s]+)\)/;
                  const match = node.data.match(regex);

                  if (match) {
                    const imageUrl = match[1];
                    console.log("Image URL", imageUrl);
                    const Delta= Quill.import("delta")
                    const imageDelta = new Delta()
                      .retain(delta.length())
                      .delete(node.data.length)
                      .insert({ image: imageUrl }, { alt: "Image" });

                    quill.updateContents(imageDelta, "silent");
                    return true;
                  }
                  return false;
                }
              ]
            ]
          }
        },
        placeholder: "Start collaborating...",
        theme: "snow"
      });

      // provider.awareness.setLocalStateField("user", {
      //   name: currentUserHandle,
      //   color: getColor(currentUserHandle)
      // });

      binding = new QuillBinding(ytext, quill, provider.awareness);
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
