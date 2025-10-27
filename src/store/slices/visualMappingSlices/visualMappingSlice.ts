import { RFState } from "shared/types/rfState";
import {
  MappingField,
  MappingState,
  SchemaDocument,
} from "shared/interfaces/IVisualMapping";
import { TreeType } from "shared/enums/enums";
import visualMappingActions from "store/actions/visualMappingActions/visualMappingActions";

export type VisualMappingSlice = {
  mappingState: MappingState;

  setMappingName: (name: string) => void;
  setMappingRef: (ref: string) => void;
  setXsdContent: (schema: SchemaDocument, key: keyof MappingState) => void;
  clearContent: (key: keyof MappingState) => void;
  addNewRow: () => void;
  deleteRow: (id: string) => void;
  setRowData: (row_id: string, data: MappingField, type: TreeType) => void;
  clearRowData: (row_id: string, type: TreeType, fieldName: string) => void;
  clearRowsByType: (type: TreeType) => void;
  loadMappingStructure: (structure: MappingState) => void;

  //modal state
  isMapListModalVisible: boolean;
  toggleMapListModal: (isVisible: boolean) => void;

  confirmModal: {
    isConfirmModalVisible: boolean;
    message: string | null;
    action: (() => void) | null;
  };

  showConfirmModal: (action: any, message: string) => void;
  resetConfirmModal: () => void;
};

const visualMappingSlice = (
  get: () => RFState,
  set: any
): VisualMappingSlice => ({
  mappingState: {
    name: null,
    reference: null,
    inputXsdContent: null,
    operations: [],
    outputXsdContent: null,
  },

  isMapListModalVisible: false,

  confirmModal: {
    isConfirmModalVisible: false,
    action: null,
    message: null,
  },
  setMappingName: visualMappingActions(get, set).setMappingName,
  setMappingRef: visualMappingActions(get, set).setMappingRef,
  setXsdContent: visualMappingActions(get, set).setXsdContent,
  clearContent: visualMappingActions(get, set).clearContent,
  addNewRow: visualMappingActions(get, set).addNewRow,
  deleteRow: visualMappingActions(get, set).deleteRow,
  setRowData: visualMappingActions(get, set).setRowData,
  clearRowData: visualMappingActions(get, set).clearRowData,
  clearRowsByType: visualMappingActions(get, set).clearRowsByType,
  loadMappingStructure: visualMappingActions(get, set).loadMappingStructure,

  //modal state
  toggleMapListModal: visualMappingActions(get, set).toggleMapListModal,
  showConfirmModal: visualMappingActions(get, set).showConfirmModal,
  resetConfirmModal: visualMappingActions(get, set).resetConfirmModal,
});

export default visualMappingSlice;
