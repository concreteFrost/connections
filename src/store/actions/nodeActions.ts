import { NodeType } from "../nodeTypes";
import {
  NodeChange,
  applyNodeChanges,
  applyEdgeChanges,
} from "react-flow-renderer";

export const addNode =
  (get: any, set: any) => (type: NodeType, posX: number, posY: number) => {
    const newNode = {
      id: get().nodes.length.toString(),
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

export const getAllSelectedNodes = (nodes:any) => {
  let nodeCount = 0;
  for (var node of nodes) {
    if (node.hasOwnProperty("selected")) {
      if(node.selected === true)
      nodeCount++;
    
    }
  }

  if (nodeCount > 1) {
    return true;
  }

  return false;
};

export const addGroup = (get: any, set: any) => () => {
 
  if (getAllSelectedNodes(get().nodes)) {
    let maxX = -Infinity;
    let minX = Infinity;
    let maxY = -Infinity;
    let minY = Infinity;
      for(var node of get().nodes){
          if(node.selected){
              if(maxX < node.position.x){
                maxX = node.position.x
              }
              if(minX > node.position.x){
                minX = node.position.x
              }
              if(maxY < node.position.x){
                maxY = node.position.y
              }
              if(minY > node.position.x){
                minY = node.position.y
              }

          }
      }
    console.log('minX', minX,'maxX',maxX,'minY', minY, 'maxY',maxY);
    console.log(get().nodes)
  }
};
