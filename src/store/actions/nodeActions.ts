import { NodeType } from "../types/nodeTypes";
import {
  NodeChange,
  applyNodeChanges,
} from "react-flow-renderer";
import { v4 as uuidv4 } from 'uuid';
import { groupActions } from "./combinedActions";

export const getNodesList = (get: any, set: any) => (data: any) => {

  const updatedNodesList = []
  for (let d of data) {
    updatedNodesList.push({
      type: 'pointer', data: {
        color: 'white',
        icon: d.name.toLowerCase().split(' ').join('_'),
        description: d.description,
        title: d.name,
        category: d.category,
        libraryType: d.libraryType
      }
    })
  }
  set({ nodeList: updatedNodesList })


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

    changes.forEach((change: NodeChange) => {
      if (change.type === 'remove') {
        groupActions.deleteGroup(get().nodes, change)
      }
    })
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  };

