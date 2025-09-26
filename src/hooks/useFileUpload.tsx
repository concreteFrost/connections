import { useState } from "react";
import { TreeNode } from "store/types/visualMapping";
import { jsonToTree, xmlToTree } from "utils/visualMapping/fileToTree";

export type FileData = any;

export function useFileUpload() {
  const [data, setData] = useState<TreeNode | undefined>();

  const loadFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      const text = event.target?.result;

      if (!text) return;

      //handle json file
      if (file.type === "application/json" || file.name.endsWith(".json")) {
        try {
          const json = JSON.parse(text as string);
          const converter = jsonToTree(json);

          setData(converter);
        } catch (err) {
          console.error("Invalid JSON file", err);
        }

        //handle xml file
      } else if (file.type === "text/xml" || file.name.endsWith(".xml")) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(
          text as string,
          "application/xml"
        );
        const converted = xmlToTree(xmlDoc.documentElement);
        setData(converted); // или через fileToD3

        //handle unsupported file
      } else {
        console.warn("Unsupported file type");
      }
    };

    reader.readAsText(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadFile(file);
  };

  return { data, handleFileChange };
}
