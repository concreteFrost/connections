import { connectionsIcons } from "../../icons/icons";


export interface NodeType {
  type: string,
  data: {
    //Api parameters
    title: string;
    category: string;
    description: string;
    libraryType: string;
    //Custom parameters
    color: string;
    icon: any
  };
}

export const nodeGroup = {
  dataGroup: "DataStore",
  externalGroup: "External",
  functionGroup: "Function",
  inputGroup: 'Input',
  outputGroup: 'Output',
}


export const nodeType = {
  // pointer: {
  //   type: "pointer",
  //   data: { title: "Pointer", color: "#FFFFFF", description: " desc...", category: nodeGroup.dataGroup, icon: connectionsIcons.pointer },
  //   zIndex: 999
  // } as NodeType,
  // sql: {
  //   type: "pointer",
  //   data: { title: "SQL", color: "#FFFFFF", description: " desc...", category: nodeGroup.dataGroup, icon: connectionsIcons.sql },
  //   zIndex: 999
  // } as NodeType,
  // db2: {
  //   type: "pointer",
  //   data: { title: "DB2", color: "#FFFFFF", description: " desc...", category: nodeGroup.dataGroup, icon: connectionsIcons.database },
  //   zIndex: 999
  // } as NodeType,
  // group: {
  //   type: "group",
  //   data: { title: "New Group", color: "#FFFFFF", description: " desc..." },
  //   zIndex: 0
  // }
}

