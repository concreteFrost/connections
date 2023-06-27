import { NodeType } from "../nodeTypes";
import { NodeChange,applyNodeChanges,
  applyEdgeChanges, } from "react-flow-renderer";

export const addNode=(get:any,set:any)=>(type:NodeType, posX : number, posY : number)=>{

  const newNode = {
    id: get().nodes.length.toString(),
    type: type.type,
    data: type.data,
    position: { x: posX, y: posY },
  }

  set((state : any) => ({
        nodes: [...state.nodes, newNode]
      }));
}

export const setSelectedNodeID=(set : any) => (nodeId: string) => {
  set({ selectedNode: nodeId })
}

export const onNodesChange=(get:any ,set:any)=>(changes: NodeChange[]) => {
  set({
    nodes: applyNodeChanges(changes, get().nodes),
  });
}





