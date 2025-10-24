import { RFState } from "shared/types/rfState";
import {
  SchemaDocument,
  MappingState,
  Operations,
  MappingField,
} from "interfaces/IVisualMapping";
import { TreeType } from "shared/enums/enums";
import { v4 as uuid } from "uuid";

const visualMappingActions = (get: () => RFState, set: any) => ({
  setMappingName: (name: string) => {
    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        mappingState: {
          ...state.visualMappingSlice.mappingState,
          name: name,
        },
      },
    }));
  },

  setMappingRef: (ref: string) => {
    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        mappingState: {
          ...state.visualMappingSlice.mappingState,
          reference: ref,
        },
      },
    }));
  },
  setXsdContent: (schema: SchemaDocument, key: keyof MappingState) => {
    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        mappingState: {
          ...state.visualMappingSlice.mappingState,
          [key]: schema,
        },
      },
    }));
  },
  clearContent: (key: keyof MappingState) => {
    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        mappingState: {
          ...state.visualMappingSlice.mappingState,
          [key]: null,
        },
      },
    }));
  },
  addNewRow: () => {
    const newRow: Operations = {
      rowId: uuid(),
      input: [],
      operation: "",
      output: [],
    };

    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        mappingState: {
          ...state.visualMappingSlice.mappingState,
          operations: [
            ...get().visualMappingSlice.mappingState.operations,
            newRow,
          ],
        },
      },
    }));
  },
  deleteRow: (id: string) => {
    const filtered = get().visualMappingSlice.mappingState.operations.filter(
      (row: Operations) => row.rowId !== id
    );
    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        mappingState: {
          ...state.visualMappingSlice.mappingState,
          operations: filtered,
        },
      },
    }));
  },
  setRowData: (rowId: string, data: MappingField, type: TreeType) => {
    const updated = get().visualMappingSlice.mappingState.operations.map(
      (row) => {
        if (row.rowId !== rowId) return row;

        if (type === TreeType.Input) {
          // Добавляем или обновляем поле в input[]
          const existingIndex = row.input.findIndex(
            (f) => f.name === data.name
          );
          const newInput =
            existingIndex >= 0
              ? row.input.map((f, i) => (i === existingIndex ? data : f))
              : [...row.input, data];
          return { ...row, input: newInput };
        }

        if (type === TreeType.Output) {
          // Добавляем или обновляем поле в output[]
          const existingIndex = row.output.findIndex(
            (f) => f.name === data.name
          );
          const newOutput =
            existingIndex >= 0
              ? row.output.map((f, i) => (i === existingIndex ? data : f))
              : [...row.output, data];
          return { ...row, output: newOutput };
        }

        return row;
      }
    );

    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        mappingState: {
          ...state.visualMappingSlice.mappingState,
          operations: updated,
        },
      },
    }));
  },
  clearRowData: (rowId: string, type: TreeType, fieldName: string) => {
    const updated = get().visualMappingSlice.mappingState.operations.map(
      (row) =>
        row.rowId === rowId
          ? {
              ...row,
              input:
                type === TreeType.Input
                  ? row.input.filter((f) => f.name !== fieldName)
                  : row.input,
              output:
                type === TreeType.Output
                  ? row.output.filter((f) => f.name !== fieldName)
                  : row.output,
            }
          : row
    );

    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        mappingState: {
          ...state.visualMappingSlice.mappingState,
          operations: updated,
        },
      },
    }));
  },
  clearRowsByType: (type: TreeType) => {
    const updated = get().visualMappingSlice.mappingState.operations.map(
      (row) => ({
        ...row,
        input: type === TreeType.Input ? [] : row.input,
        output: type === TreeType.Output ? [] : row.output,
      })
    );

    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        mappingState: {
          ...state.visualMappingSlice.mappingState,
          operations: updated,
        },
      },
    }));
  },
  loadMappingStructure: (structure: MappingState) => {
    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        mappingState: structure,
      },
    }));
  },

  //modal state

  isMapListModalVisible: false,

  toggleMapListModal: (isVisible: boolean) => {
    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        isMapListModalVisible: isVisible,
      },
    }));
  },

  confirmModal: {
    isConfirmModalVisible: false,
    action: null,
    message: null,
  },

  showConfirmModal: (action: any, message: string) => {
    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        confirmModal: {
          isConfirmModalVisible: true,
          action: action,
          message: message,
        },
      },
    }));
  },

  resetConfirmModal: () => {
    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        confirmModal: {
          isConfirmModalVisible: false,
          action: null,
          message: null,
        },
      },
    }));
  },
});

export default visualMappingActions;
