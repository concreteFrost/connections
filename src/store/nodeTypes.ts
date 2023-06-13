import { connectionsIcons } from "../icons/icons";


export interface NodeType {
  type: string,
  data: {
    title: string;
    color: string;
    description: string;
    group: string;
    icon : any
  };
}

export const nodeGroup={
  dataGroup : "dataGroup",
  externalGroup: "externalGroup",
  functionGroup: "functionGroup"
}


export const nodeType = {
  pointer: {
    type: "pointer",
    data: { title: "Pointer", color: "#FFFFFF", description: " desc...", group: nodeGroup.dataGroup, icon: connectionsIcons.pointer  }
  } as NodeType,
  sql: {
    type: "pointer",
    data : { title: "SQL", color: "#FFFFFF", description: " desc...", group: nodeGroup.dataGroup, icon:connectionsIcons.sql  }
  } as NodeType,
  db2: {
    type: "pointer",
    data: { title: "DB2", color: "#FFFFFF", description: " desc...", group: nodeGroup.dataGroup, icon:connectionsIcons.database  }
  } as NodeType
}

