import { RFState } from "store/types/rfState";
import {
  RowElement,
  MappingState,
  TreeNode,
} from "store/interfaces/IVisualMapping";
import { TreeType } from "store/enums/enums";
import { v4 as uuid } from "uuid";

export type VisualMappingSlice = {
  mappingState: MappingState[];

  addNewRow: () => void;
  deleteRow: (id: string) => void;
  setRowData: (row_id: string, data: RowElement) => void;
  clearRowData: (row_id: string, type: TreeType) => void;
  clearRowsByType: (type: TreeType) => void;
};

const visualMappingSlice = (
  get: () => RFState,
  set: any
): VisualMappingSlice => ({
  mappingState: [],

  addNewRow: () => {
    const newRow: MappingState = {
      row_id: uuid(),
      input: null,
      operation: "",
      output: null,
    };

    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        mappingState: [...get().visualMappingSlice.mappingState, newRow],
      },
    }));
  },
  deleteRow: (id: string) => {
    const filtered = get().visualMappingSlice.mappingState.filter(
      (row: MappingState) => row.row_id !== id
    );
    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        mappingState: filtered,
      },
    }));
  },
  setRowData: (row_id: string, data: RowElement) => {
    const mapped = get().visualMappingSlice.mappingState.map(
      (row: MappingState) =>
        row.row_id === row_id
          ? {
              ...row,
              [data.type]: data,
            }
          : row
    );
    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        mappingState: mapped,
      },
    }));
  },
  clearRowData: (row_id: string, type: TreeType) => {
    const mapped = get().visualMappingSlice.mappingState.map((row) =>
      row.row_id === row_id
        ? {
            ...row,
            [type]: null,
          }
        : row
    );

    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        mappingState: mapped,
      },
    }));
  },
  clearRowsByType: (type: TreeType) => {
    const filtered = get().visualMappingSlice.mappingState.map(
      (row: MappingState) => {
        return {
          ...row,
          input: type === TreeType.Input ? null : row.input,
          output: type === TreeType.Output ? null : row.output,
        };
      }
    );
    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        mappingState: filtered,
      },
    }));
  },
});

export default visualMappingSlice;
