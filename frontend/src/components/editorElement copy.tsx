import { useEffect, useRef } from 'react';
import { createHighlighter, Highlighter } from 'shiki';
import * as monaco from 'monaco-editor-core';
import { shikiToMonaco } from '@shikijs/monaco';

interface EditorElementProps {
  editorLanguage: string;
  editorValue: string;
  handleEditorChange: (value: string | undefined) => void;
}

let highlighterInstance: Highlighter | null = null;

function EditorElement({ editorLanguage, editorValue, handleEditorChange }: EditorElementProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoEditorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    const initializeEditor = async () => {
      if (!highlighterInstance) {
        // Initialize syntax highlighting if not already done
        highlighterInstance = await createHighlighter({
          themes: ['vitesse-dark', 'vitesse-light', 'dark-plus'],
          langs: ['javascript', 'typescript', 'html', 'css'],
        });
        shikiToMonaco(highlighterInstance, monaco);
      }

      if (monacoEditorRef.current) {
        const currentModel = monacoEditorRef.current.getModel();
        
        // Only update model if language or value changes
        if (currentModel) {
          if (currentModel.getLanguageId() !== editorLanguage || currentModel.getValue() !== editorValue) {
            currentModel.dispose(); // Dispose the previous model
            const newModel = monaco.editor.createModel(editorValue, editorLanguage);
            monacoEditorRef.current.setModel(newModel);
          }
        }
      } else if (editorRef.current) {
        // Initial editor creation
        monacoEditorRef.current = monaco.editor.create(editorRef.current, {
          value: editorValue,
          language: editorLanguage,
          theme: 'dark-plus',
          automaticLayout: true,
        });

        // Attach a listener for content changes
        monacoEditorRef.current.onDidChangeModelContent(() => {
          const currentValue = monacoEditorRef.current?.getValue();
          handleEditorChange(currentValue);
        });
      }
    };

    initializeEditor();

    // Cleanup on unmount
    return () => {
      monacoEditorRef.current?.dispose();
      monacoEditorRef.current = null;
    };
  }, [editorLanguage, editorValue, handleEditorChange]);

  return <div ref={editorRef} style={{ height: '100%' }} />;
}

export default EditorElement;
