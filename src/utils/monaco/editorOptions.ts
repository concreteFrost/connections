export interface EditorSettings {
  path: string;
  language: string;
  value: string;
}

export const editorOptions: Array<EditorSettings> = [
  {
    path: "script.cs",
    language: "csharp",
    value: `using System;`,
  },
  {
    path: "script.xml",
    language: "xml",
    value: `<?xml version="1.0" encoding="UTF-8"?>`,
  },

  {
    path: "script.js",
    language: "javascript",
    value: `console.log("Hello, World!");`,
  },
  {
    path: "script.json",
    language: "json",
    value: `{
      "dependencies": {
          
      }
  }`,
  },
  {
    path: "script.html",
    language: "html",
    value: "",
  },
];
