export const theme = {
  base: 'vs-dark', // Specify 'vs', 'vs-dark', or 'hc-black' as the base theme
  inherit: true, // Inherit from the base theme
  rules: [
    { token: 'comment', foreground: '3d7838' },
    { token: 'keyword', foreground: '5a76d1', fontStyle: 'bold' },
    { token: 'string', foreground: 'de9c50' },
    { token: 'number', foreground: '73ffce' },
    { token: 'identifier', foreground: 'fff5b3' },
    { token: 'variable', foreground: 'ffffff' },
  ],
  colors: {
    'editor.background': '#0a0e14',
    'editor.foreground': '#F8F8F2',
    'editor.lineHighlightBackground': '#0f151e',
    'editor.selectionBackground': '#44475a',
    'editorCursor.foreground': '#72767d',
  },
}