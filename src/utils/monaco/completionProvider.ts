import * as monaco from "@monaco-editor/react";
import { Monaco } from "@monaco-editor/react";
import {cSharpAutocomplete, xmlAutoComplete } from "./autocomplete";


export function handleCSharpCompletion(monacoInstance: Monaco){
    monacoInstance.languages.registerCompletionItemProvider("csharp", {
        provideCompletionItems: function (model, position) {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };
  
          return {
            suggestions: cSharpAutocomplete(range)
          };
        },
      });
}

export function handleXmlCompletion(monacoInstance: Monaco){
    monacoInstance.languages.registerCompletionItemProvider("xml", {
        provideCompletionItems: function (model, position) {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };
  
          return {
            suggestions: xmlAutoComplete(range)
          };
        },
      });
}