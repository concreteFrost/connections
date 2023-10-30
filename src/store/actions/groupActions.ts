import { v4 as uuidv4 } from "uuid";
import { NodeProps, NodeRemoveChange } from "react-flow-renderer";
import { IVisual } from "../interfaces/Ivisual";
import { RFState } from "../types/rfState";
import { INodeGroup, INodeType } from "../interfaces/INode";

export const getAllselectedBlockIDs = (nodes: NodeProps[]) => {
  return nodes.filter((node) => node.selected === true).length > 1;
};

export const addGroup = (get: any, set: any) => () => {
  const selectedBlockIDs = get().flow.visual.blocks.filter(
    (node: NodeProps) => node.selected
  );
  if (selectedBlockIDs.length > 1) {
    let maxX = -Infinity;
    let minX = Infinity;
    let maxY = -Infinity;
    let minY = Infinity;
    selectedBlockIDs.forEach((node: IVisual) => {
      maxX = Math.max(maxX, node.position.x);
      minX = Math.min(minX, node.position.x);
      maxY = Math.max(maxY, node.position.y);
      minY = Math.min(minY, node.position.y);
    });

    const boundX = maxX - minX + 200;
    const boundY = maxY - minY + 100;

    const newGroupNode = {
      id: uuidv4().toString(),
      type: "group",
      data: {
        label: "New Group",
        color: "#4a94be2a",
        children: [],
        isTextModalVisible: false,
        isColorModalVisible: false,
      },
      position: { x: minX - 20, y: minY - 20 },
      style: {
        width: boundX,
        height: boundY,
        backgroundColor: "#4a94be2a",
        zIndex: 0,
      },
    };

    assignParent(get().flow.visual.blocks, newGroupNode);
    set((state: RFState) => ({
      flow: {
        ...state.flow,
        visual: {
          ...state.flow.visual,
          blocks: [...state.flow.visual.blocks, newGroupNode],
        },
      },
    }));
  }
};

const assignParent = (nodes: Array<INodeGroup>, nodeGroup: any) => {
  const selectedBlockIDs = nodes.filter((node: any) => node.selected === true);
  selectedBlockIDs.forEach((node: any) => {
    node.parentNode = nodeGroup.id;
    nodeGroup.data.children.push(node.id);
    node.position.x -= nodeGroup.position.x;
    node.position.y -= nodeGroup.position.y;
  });
};

const removeParent = (nodes: any, groupToRemove: any) => {
  nodes.forEach((node: any) => {
    if (node.parentNode == groupToRemove.id) {
      node.position.x += groupToRemove.position.x;
      node.position.y += groupToRemove.position.y;
      node.parentNode = null;
    }
  });
};

export const deleteGroup = (nodes: any, change: NodeRemoveChange) => {
  const groupToRemove = nodes.find((node: NodeProps) => node.id === change.id);
  removeParent(nodes, groupToRemove);
};

export const deleteGroupOnButtonClick =
  (get: any, set: any) => (groupToDelete: string) => {
    const matchNode = get().flow.visual.blocks.find(
      (node: NodeProps) => node.id === groupToDelete
    );
    removeParent(get().flow.visual.blocks, matchNode);
    set((state: any) => ({
      flow: {
        ...state.flow,
        visual: {
          ...state.flow.visual,
          blocks: state.flow.visual.blocks.filter((node: NodeProps) => node.id !== groupToDelete),
        }
      }

    }));
  };

const updateNode = (set: any) => (groupId: string, updateFn: any) => {
  set((state: any) => ({
    flow: {
      ...state.flow,
      visual: {
        ...state.flow.visual,
        blocks: state.flow.visual.blocks.map((node: any) => {
          if (node.id === groupId) {
            return {
              ...node,
              data: updateFn(node.data),
            };
          }
          return node;
        }),
      },
    },
  }));
};

export const showGroupModal =
  (set: any) => (groupId: string, modalToShow: string) => {
    const updateFn = (data: any) => ({
      ...data,
      isTextModalVisible: modalToShow === "textModal",
      isColorModalVisible: modalToShow === "colorModal",
    });

    updateNode(set)(groupId, updateFn);
  };

export const changeGroupLabel =
  (set: any) => (groupId: string, input: string) => {
    const updateFn = (data: any) => ({
      ...data,
      label: input,
    });

    updateNode(set)(groupId, updateFn);
  };

export const changeGroupColor =
  (set: any) => (groupId: string, input: string) => {
    set((state: any) => ({
      flow: {
        ...state.flow,
        visual: {
          ...state.flow.visual,
          blocks: state.flow.visual.blocks.map((node: any) => {
            if (node.id === groupId) {
              return {
                ...node,
                style: { ...node.style, backgroundColor: input + "2a" },
                data: { ...node.data, color: input + "2a" },
              };
            }
            return node;
          }),
        },
      },
    }));
  };

export const hideAllGroupModals = (set: any) => () => {
  set((state: any) => ({
    flow: {
      ...state.flow,
      visual: {
        ...state.flow.visual,
        blocks: state.flow.visual.blocks.map((node: NodeProps) => {
          if (node.data.hasOwnProperty("isTextModalVisible")) {
            return {
              ...node,
              data: {
                ...node.data,
                isTextModalVisible: false,
                isColorModalVisible: false,
              },
            };
          }
          return node;
        }),
      },
    },
  }));
};
