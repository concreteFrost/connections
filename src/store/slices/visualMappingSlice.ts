import { RFState } from "store/types/rfState";
import {
  RowElement,
  RowState,
  TreeNode,
} from "store/interfaces/IVisualMapping";
import { TreeType } from "store/enums/enums";
import { v4 as uuid } from "uuid";

export type VisualMappingSlice = {
  rows: RowState[];

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
  rows: [],

  addNewRow: () => {
    const newRow: RowState = {
      row_id: uuid(),
      input: null,
      operation: "",
      output: null,
    };

    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        rows: [...get().visualMappingSlice.rows, newRow],
      },
    }));
  },
  deleteRow: (id: string) => {
    const filtered = get().visualMappingSlice.rows.filter(
      (row: RowState) => row.row_id !== id
    );
    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        rows: filtered,
      },
    }));
  },
  setRowData: (row_id: string, data: RowElement) => {
    const mapped = get().visualMappingSlice.rows.map((row: RowState) =>
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
        rows: mapped,
      },
    }));
  },
  clearRowData: (row_id: string, type: TreeType) => {
    const mapped = get().visualMappingSlice.rows.map((row) =>
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
        rows: mapped,
      },
    }));
  },
  clearRowsByType: (type: TreeType) => {
    const filtered = get().visualMappingSlice.rows.map((row: RowState) => {
      return {
        ...row,
        input: type === TreeType.Input ? null : row.input,
        output: type === TreeType.Output ? null : row.output,
      };
    });
    set((state: RFState) => ({
      visualMappingSlice: {
        ...state.visualMappingSlice,
        rows: filtered,
      },
    }));
  },
});

export default visualMappingSlice;
