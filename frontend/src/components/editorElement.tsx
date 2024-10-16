// EditorElement.tsx
import { Editor, Monaco } from "@monaco-editor/react";
import { setupShiki } from "./setupShiki";

interface EditorElementProps {
  editorLanguage: string;
  editorValue: string;
  handleEditorChange: (value: string | undefined) => void;
}

function EditorElement({ editorLanguage, editorValue, handleEditorChange }: EditorElementProps) {
  
  const handleEditorWillMount = (monaco: Monaco) => {
    setupShiki(monaco);
  };

  return (
    <Editor
      height="100%"
      language={editorLanguage}
      value={editorValue}
      onChange={(value) => handleEditorChange(value)}
      beforeMount={handleEditorWillMount} // Call Shiki setup here
      theme="dark-plus" // This can be updated dynamically to the Shiki theme
    />
  );
}

export default EditorElement;
