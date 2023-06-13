import {
    Edge,
    Node,
    OnNodesChange,
    OnEdgesChange,
    OnConnect, 
  } from "react-flow-renderer";

import { NodeType } from "../nodeTypes";

export type RFState = {
    nodes: Node[];
    edges: Edge[];
    selectedNode: string | null,
    rightPanel: {
      base: {
        blockName: string,
        blockColor: string,
        blockDescription: string
      }
    },
    
    setSelectedNodeID: (nodeId: string) => void;
    onNodesChange: OnNodesChange;
    onConnect: OnConnect;
    onEdgesChange: OnEdgesChange;
    addNode: (type: NodeType, posX : number, posY:number) => void; 
    getNodeBase: (nodeBase: object) => void;
    setNodeName: (text: string) => void;
    setNodeColor: (color: string) => void;
    setNodeDescription: (description: string) => void;
  
  };
  