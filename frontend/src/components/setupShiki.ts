// setupShiki.ts
import { Monaco } from "@monaco-editor/react";
import { shikiToMonaco } from "@shikijs/monaco";
import * as shiki from "shiki";
import * as monacoEditor from "monaco-editor-core";

export async function setupShiki(monaco: Monaco) {
  const highlighter = await shiki.createHighlighter({
    themes: ["dark-plus"], // Set your preferred theme
    langs: ["javascript", "typescript", "css", "html", "jsx", "tsx"], // Define languages you want to support
  });

  shikiToMonaco(highlighter, monaco as typeof monacoEditor);
}
