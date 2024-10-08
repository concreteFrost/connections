import * as monaco from "monaco-editor";

export function cSharpAutocomplete(range: any) {
    return [
      {
        label: "Console.WriteLine",
        kind: monaco.languages.CompletionItemKind.Function,
        documentation: "Writes the specified data to the standard output",
        insertText: "Console.WriteLine($1);",
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
      },
      {
        label: "public",
        kind: monaco.languages.CompletionItemKind.Keyword,
        documentation: "Declares a public method or variable",
        insertText: "public ",
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
      },
      {
        label: "private",
        kind: monaco.languages.CompletionItemKind.Keyword,
        documentation: "Declares a private method or variable",
        insertText: "private ",
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
      },
      {
        label: "for",
        kind: monaco.languages.CompletionItemKind.Snippet,
        documentation: "A for loop snippet",
        insertText: [
          "for (int ${1:i} = 0; ${1:i} < ${2:length}; ${1:i}++) {",
          "\t$0",
          "}",
        ].join("\n"),
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
      },
      {
        label: "foreach",
        kind: monaco.languages.CompletionItemKind.Snippet,
        documentation: "A foreach loop snippet",
        insertText: [
          "foreach (var ${1:item} in ${2:collection}) {",
          "\t$0",
          "}",
        ].join("\n"),
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
      },
      {
        label: "if",
        kind: monaco.languages.CompletionItemKind.Snippet,
        documentation: "If statement snippet",
        insertText: ["if (${1:condition}) {", "\t$0", "}"].join("\n"),
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
      },
      {
        label: "else",
        kind: monaco.languages.CompletionItemKind.Snippet,
        documentation: "Else statement snippet",
        insertText: ["else {", "\t$0", "}"].join("\n"),
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
      },
      {
        label: "try-catch",
        kind: monaco.languages.CompletionItemKind.Snippet,
        documentation: "Try-catch block snippet",
        insertText: [
          "try {",
          "\t$0",
          "} catch (${1:Exception} ${2:e}) {",
          "\tConsole.WriteLine(${2:e}.Message);",
          "}"
        ].join("\n"),
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
      },
      {
        label: "class",
        kind: monaco.languages.CompletionItemKind.Snippet,
        documentation: "Class definition snippet",
        insertText: [
          "public class ${1:ClassName} {",
          "\t$0",
          "}"
        ].join("\n"),
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
      },
      {
        label: "namespace",
        kind: monaco.languages.CompletionItemKind.Snippet,
        documentation: "Namespace definition snippet",
        insertText: [
          "namespace ${1:NamespaceName} {",
          "\t$0",
          "}"
        ].join("\n"),
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
      },
      {
        label: "using",
        kind: monaco.languages.CompletionItemKind.Snippet,
        documentation: "Using directive snippet",
        insertText: "using ${1:Namespace};",
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
      },
      {
        label: "void",
        kind: monaco.languages.CompletionItemKind.Keyword,
        documentation: "Void return type for methods",
        insertText: "void ",
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
      },
      {
        label: "return",
        kind: monaco.languages.CompletionItemKind.Keyword,
        documentation: "Return statement",
        insertText: "return $1;",
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
      },
      {
        label: "bool",
        kind: monaco.languages.CompletionItemKind.Keyword,
        documentation: "Boolean data type",
        insertText: "bool ",
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
      },
      {
        label: "int",
        kind: monaco.languages.CompletionItemKind.Keyword,
        documentation: "Integer data type",
        insertText: "int ",
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
      },
      {
        label: "string",
        kind: monaco.languages.CompletionItemKind.Keyword,
        documentation: "String data type",
        insertText: "string ",
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
      },
      {
        label: "List<T>",
        kind: monaco.languages.CompletionItemKind.Snippet,
        documentation: "List of type T",
        insertText: "List<${1:T}> ${2:listName} = new List<${1:T}>();",
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
      },
      {
        label: "Main method",
        kind: monaco.languages.CompletionItemKind.Snippet,
        documentation: "Entry point of a console application",
        insertText: [
          "public static void Main(string[] args) {",
          "\t$0",
          "}"
        ].join("\n"),
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        range: range,
      },
    ];
  }

export function xmlAutoComplete(range: any) {
    return [
        {
            label: "<note>",
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "Basic note element",
            insertText: "<note>\n\t<to>$1</to>\n\t<from>$2</from>\n\t<heading>$3</heading>\n\t<body>$4</body>\n</note>",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
          },
          {
            label: "<book>",
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "Book element",
            insertText: "<book>\n\t<title>$1</title>\n\t<author>$2</author>\n\t<year>$3</year>\n</book>",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
          },
          {
            label: "<employee>",
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "Employee element",
            insertText: "<employee>\n\t<id>$1</id>\n\t<name>$2</name>\n\t<department>$3</department>\n\t<position>$4</position>\n</employee>",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
          },
          {
            label: "version",
            kind: monaco.languages.CompletionItemKind.Keyword,
            documentation: "XML version attribute",
            insertText: 'version="1.0"',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
          },
          {
            label: "encoding",
            kind: monaco.languages.CompletionItemKind.Keyword,
            documentation: "Encoding attribute for XML declaration",
            insertText: 'encoding="UTF-8"',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
          },
          {
            label: "xmlns",
            kind: monaco.languages.CompletionItemKind.Keyword,
            documentation: "XML namespace attribute",
            insertText: 'xmlns:$1="$2"',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
          },
          {
            label: "<!-- comment -->",
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "Comment in XML",
            insertText: "<!-- $1 -->",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
          },
          {
            label: "<root>",
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "Root element",
            insertText: "<root>\n\t$1\n</root>",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
          },
          {
            label: "<item>",
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "Item element",
            insertText: "<item>\n\t<name>$1</name>\n\t<value>$2</value>\n</item>",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
          },
          {
            label: "<list>",
            kind: monaco.languages.CompletionItemKind.Snippet,
            documentation: "List element",
            insertText: "<list>\n\t<item>$1</item>\n</list>",
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: range,
          },
    ];
  }
  
  
