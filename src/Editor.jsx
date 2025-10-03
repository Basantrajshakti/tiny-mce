// import React, { useRef } from "react";
// import { Editor } from "@tinymce/tinymce-react";

// export default function RichTextEditor() {
//   const editorRef = useRef(null);

//   const logContent = () => {
//     if (editorRef.current) {
//       console.log(editorRef.current.getContent());
//     }
//   };

//   return (
//     <div>
//       <Editor
//         onInit={(evt, editor) => (editorRef.current = editor)}
//         tinymceScriptSrc='/tinymce/tinymce.min.js' // ✅ self-hosted TinyMCE
//         init={{
//           height: 500,
//           menubar: true,
//           license_key: "gpl", // ✅ prevents license popup
//           plugins: [
//             "advlist",
//             "autolink",
//             "lists",
//             "link",
//             "image",
//             "charmap",
//             "preview",
//             "anchor",
//             "searchreplace",
//             "visualblocks",
//             "code",
//             "fullscreen",
//             "insertdatetime",
//             "media",
//             "table",
//             "help",
//             "wordcount",
//           ],
//           toolbar:
//             "undo redo | blocks | bold italic underline strikethrough forecolor backcolor | " +
//             "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
//             "removeformat | link image media table | code fullscreen preview | help",
//           branding: false, // removes "Powered by Tiny"
//         }}
//       />
//       <button onClick={logContent} style={{ marginTop: "10px" }}>
//         Log Content
//       </button>
//     </div>
//   );
// }

import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

import "tinymce/skins/ui/oxide/skin.min.css";

// Import TinyMCE core
import "tinymce/tinymce";

// Import icons, theme, and model
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/models/dom";

// Import plugins you need
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/lists";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/charmap";
import "tinymce/plugins/preview";
import "tinymce/plugins/anchor";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/code";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/insertdatetime";
import "tinymce/plugins/media";
import "tinymce/plugins/table";
import "tinymce/plugins/wordcount";
// import "tinymce/plugins/help";

import contentCss from "tinymce/skins/content/default/content.min.css";
import contentUiCss from "tinymce/skins/ui/oxide/content.min.css";

export default function RichTextEditor() {
  const editorRef = useRef(null);

  // ✅ Controlled state
  const [content, setContent] = useState("");

  // ✅ Load saved content on mount
  useEffect(() => {
    const saved = localStorage.getItem("tinymce-content");
    if (saved) {
      setContent(saved);
    }
  }, []);

  // ✅ Save content whenever state changes
  useEffect(() => {
    if (content !== undefined) {
      localStorage.setItem("tinymce-content", content);
      // console.log(content, "content");
    }
  }, [content]);

  return (
    <Editor
      value={content} // controlled
      onInit={(evt, editor) => (editorRef.current = editor)}
      onEditorChange={(newContent) => setContent(newContent)}
      init={{
        skin: false,
        content_css: false,
        // content_style: "body { font-family: Helvetica, Arial, sans-serif; font-size:14px; }",
        content_style: [contentCss, contentUiCss].join("\n"),
        height: 500,
        menubar: true,
        license_key: "gpl", // ✅ avoids license popup
        plugins: [
          "advlist",
          "image",
          "charmap",
          "preview",
          "media",
          // Text related only
          "autolink",
          "lists",
          "link",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "table",
          "wordcount",
        ],
        // toolbar:
        //   "undo redo | blocks | bold italic underline strikethrough forecolor backcolor | " +
        //   "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
        //   "removeformat | link table  ",
        toolbar:
          "undo redo | blocks | bold italic underline strikethrough forecolor backcolor | " +
          "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | link image media table | code fullscreen preview  ",
        branding: false,
        // This enables file picker for images
        file_picker_types: "image",
        object_resizing: true,
        file_picker_callback: (callback, value, meta) => {
          if (meta.filetype === "image") {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");

            input.onchange = function () {
              const file = input.files[0];
              const reader = new FileReader();
              reader.onload = function () {
                // Base64 encode image and return to TinyMCE
                const base64 = reader.result;
                callback(base64, { alt: file.name });
              };
              reader.readAsDataURL(file);
            };

            input.click();
          }
        },
      }}
    />
  );
}
