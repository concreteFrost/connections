import { TreeNode } from "store/interfaces/IVisualMapping";
import { decodeBase64, xsdToTree } from "utils/visualMapping/fileToTree";

export type FileData = any;

// export function useFileUpload() {
//   const [data, setData] = useState<TreeNode | undefined>();

//   const loadFile = (file: File) => {
//     const reader = new FileReader();

//     reader.onload = (event: ProgressEvent<FileReader>) => {
//       const text = event.target?.result;
//       let converted = null;

//       if (!text) return;

//       //handle json file
//       if (file.type === "application/json" || file.name.endsWith(".json")) {
//         converted = convertJSONToTree(text);
//         setData(converted);
//       }
//       //handle xml file
//       else if (file.type === "text/xml" || file.name.endsWith(".xml")) {
//         converted = convertXMLToTreeNode(text);
//         setData(converted); // или через fileToD3
//       }
//       //handle xsd file
//       else if (file.type === "text/xsd" || file.name.endsWith(".xsd")) {
//         converted = convertXSDToTreeNode(text);
//         setData(converted);
//       } else {
//         console.warn("Unsupported file type");
//       }
//     };

//     reader.readAsText(file);
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) loadFile(file);
//   };

//   return { data, handleFileChange };
// }

// function convertJSONToTree(text: string | ArrayBuffer): TreeNode {
//   const json = JSON.parse(text as string);
//   return jsonToTree(json);
// }

// function convertXMLToTreeNode(text: string | ArrayBuffer): TreeNode {
//   const parser = new DOMParser();
//   const xmlDoc = parser.parseFromString(text as string, "application/xml");
//   return xmlToTree(xmlDoc.documentElement);
// }
