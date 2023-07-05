import { connectionsIcons } from "../icons/icons";


export interface NodeType {
  type: string,
  data: {
    title: string;
    color: string;
    description: string;
    group: string;
    icon: any
  };
}

export const nodeGroup = {
  dataGroup: "dataGroup",
  externalGroup: "externalGroup",
  functionGroup: "functionGroup"
}


export const nodeType = {
  pointer: {
    type: "pointer",
    data: { title: "Pointer", color: "#FFFFFF", description: " desc...", group: nodeGroup.dataGroup, icon: connectionsIcons.pointer },
    zIndex: 999
  } as NodeType,
  sql: {
    type: "pointer",
    data: { title: "SQL", color: "#FFFFFF", description: " desc...", group: nodeGroup.dataGroup, icon: connectionsIcons.sql },
    zIndex: 999
  } as NodeType,
  db2: {
    type: "pointer",
    data: { title: "DB2", color: "#FFFFFF", description: " desc...", group: nodeGroup.dataGroup, icon: connectionsIcons.database },
    zIndex: 999
  } as NodeType,
  group: {
    type: "group",
    data: { title: "New Group", color: "#FFFFFF", description: " desc..." },
    zIndex: 0
  }
}

