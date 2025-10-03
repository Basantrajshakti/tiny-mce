// ToolbarPlugin.js
import React from "react";
import { FORMAT_TEXT_COMMAND, UNDO_COMMAND, REDO_COMMAND } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  return (
    <div className='toolbar'>
      <button onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}>↺</button>
      <button onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}>↻</button>
      <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}>B</button>
      <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}>I</button>
      <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}>U</button>
      <button onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")}>
        S
      </button>
    </div>
  );
}
