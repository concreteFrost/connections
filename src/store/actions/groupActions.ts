import { v4 as uuidv4 } from "uuid";
import { NodeProps, NodeRemoveChange } from "react-flow-renderer";
import { IVisual } from "../interfaces/Iflow";
import { RFState } from "../types/rfState";

export const getAllselectedBlockIDs = (nodes: any) => {
  return nodes.filter((node : any) => node.selected === true).length > 1;
};

export const addGroup = (get: () => RFState, set: any) => () => {
  const selectedBlockIDs = get().flowSlice.flow.visual.blocks.filter(
    (node: any) => node.selected
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

    assignParent(get().flowSlice.flow.visual.blocks, newGroupNode);
    set((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        flow: {
          ...state.flowSlice.flow,
          visual: {
            ...state.flowSlice.flow.visual,
            blocks: [...state.flowSlice.flow.visual.blocks, newGroupNode],
          },
        }
      },
    }));

    console.log('group added', get().flowSlice)
  }
};

const assignParent = (nodes: Array<any>, nodeGroup: any) => {
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
  (get: () => RFState, set: any) => (groupToDelete: string) => {
    const matchNode = get().flowSlice.flow.visual.blocks.find(
      (node: any) => node.id === groupToDelete
    );
    removeParent(get().flowSlice.flow.visual.blocks, matchNode);
    set((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        flow: {
          ...state.flowSlice.flow,
          visual: {
            ...state.flowSlice.flow.visual,
            blocks: state.flowSlice.flow.visual.blocks.filter((node: any) => node.id !== groupToDelete),
          }
        }

      }

    }));
  };

const updateNode = (set: any) => (groupId: string, updateFn: any) => {
  set((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      flow: {
        ...state.flowSlice.flow,
        visual: {
          ...state.flowSlice.flow.visual,
          blocks: state.flowSlice.flow.visual.blocks.map((node: any) => {
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
  (set: RFState) => (groupId: string, input: string) => {
    const updateFn = (data: any) => ({
      ...data,
      label: input,
    });

    updateNode(set)(groupId, updateFn);
  };

export const changeGroupColor =
  (set: any) => (groupId: string, input: string) => {
    set((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        flow: {
          ...state.flowSlice.flow,
          visual: {
            ...state.flowSlice.flow.visual,
            blocks: state.flowSlice.flow.visual.blocks.map((node: any) => {
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

      },
    }));
  };

export const hideAllGroupModals = (set: any) => () => {
  set((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      flow: {
        ...state.flowSlice.flow,
        visual: {
          ...state.flowSlice.flow.visual,
          blocks: state.flowSlice.flow.visual.blocks.map((node: any) => {
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
      }

    },
  }));
};

const groupActions = {
  addGroup: addGroup,
  deleteGroup: deleteGroup,
  deleteGroupOnButtonClick: deleteGroupOnButtonClick,
  showGroupModal: showGroupModal,
  setGroupLabel: changeGroupLabel,
  setGroupColor: changeGroupColor,
  hideAllGroupModals: hideAllGroupModals,
};

export default groupActions;
