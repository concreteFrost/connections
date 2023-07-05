import { NodeType } from "../types/nodeTypes";
import {
  NodeChange,
  applyNodeChanges,
} from "react-flow-renderer";
import { v4 as uuidv4 } from 'uuid';

export const getNodesList = (get: any, set: any) => (data: any) => {

  const updatedNodes = []
  for (let d of data) {
    updatedNodes.push({ ...d, type: 'pointer', data: { color: 'white', icon: null, description: d.description, title: d.name } })
  }
  set({ nodeList: updatedNodes })
  console.log(get().nodeList)
}

export const addNode =
  (get: any, set: any) => (type: NodeType, posX: number, posY: number) => {
    const newNode = {
      id: uuidv4().toString(),
      type: type.type,
      data: type.data,
      position: { x: posX, y: posY },
    };

    set((state: any) => ({
      nodes: [...state.nodes, newNode],
    }));
  };

export const setSelectedNodeID = (set: any) => (nodeId: string) => {
  set({ selectedNode: nodeId });

};

export const onNodesChange =
  (get: any, set: any) => (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  };

