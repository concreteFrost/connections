import { NodeType } from "store/interfaces/INode";

export const mockBlock: NodeType = {
  visualData: {
    color: "white",
    icon: "nevermind",
  },
  type: "pointer",
  data: {
    name: "File System",
    blockVersion: "4.1.8",
    category: "",
    blockLabel: "File System",
    blockType: "File System",
    description:
      "Retrieves a list of files from a specified directory, filtering with the given mask",
    typeName:
      "CN.Connections.ProcessBlocks.OfTypeExternal.ExternalDataHandlerFS",
    baseTypeName: "External",
    parameters: [
      {
        name: "DIRECTORY",
        value: "",
        required: true,
        format: "0",
        description:""
      },
      {
        name: "FILE_MATCH",
        value: "",
        required: true,
        format: "0",
        description:""
      },
      {
        name: "ENABLED",
        value: "Y",
        required: true,
        format: "5",
        description:""
      },
      {
        name: "EXECUTION_INSTRUCTIONS",
        value: "N",
        required: true,
        format: "6",
        description:""
      },
      {
        name: "TRACKING_ENABLED",
        value: "N",
        required: false,
        format: "5",
        description:""
      },
      {
        name: "TRACK_ID",
        value: "",
        required: false,
        format: "7",
        description:""
      },
      {
        name: "TRACKING_DATA",
        value: "",
        required: false,
        format: "0",
        description:""
      },
      {
        name: "XML_BASE",
        value: "",
        required: false,
        format: "0",
        description:""
      },
    ],
    extendedParameters: [],
    ehDirective: "",
    // color:"white",
    // icon:'none',
  },
};

export const mockBlocks : any = [
  {
    name: "SAP",
    blockVersion: "1.0.0",
    blockIdentifier: null,
    blockLabel: "SAP",
    blockType: "SAP",
    description:
      "Configure integrations with SAP Cloud Integration for Data Services",
    typeName:
      "CN.Connections.ProcessBlocks.OfTypeExternal.ExternalDataHandlerSAP",
    baseTypeName: "External",
    category: "External",
    libraryType: "New Type",
    parameters: [
      {
        name: "SAP_URL",
        value: "",
        required: true,
        format: "0",
        description:""
      },
      {
        name: "SAP_PORT",
        value: 0,
        required: false,
        format: "1",
        description:""
      },
      {
        name: "SAP_USERNAME",
        value: "",
        required: true,
        format: "0",
        description:""
      },
      {
        name: "SAP_PASSWORD",
        value: "",
        required: true,
        format: "0",
        description:""
      },
      {
        name: "SAP_CONNECTION_TYPE",
        value: "",
        required: true,
        format: "0",
        description:""
      },
      {
        name: "SAP_OBJECT",
        value: "",
        required: false,
        format: "0",
        description:""
      },
      {
        name: "SAP_DESTINATION",
        value: "",
        required: false,
        format: "0",
        description:""
      },
      {
        name: "SAP_TIMEOUT",
        value: 0,
        required: false,
        format: "1",
        description:""
      },
      {
        name: "ENABLED",
        value: "N",
        required: true,
        format: "5",
        description:""
      },
    ],
  },
  {
    name: "UiPath",
    blockVersion: "1.0.0",
    blockIdentifier: null,
    blockLabel: "UiPath",
    blockType: "UiPath",
    description: "Connects to UiPath Automation Hub",
    typeName:
      "CN.Connections.ProcessBlocks.OfTypeExternal.ExternalDataHandlerUiPath",
    baseTypeName: "External",
    category: "External",
    libraryType: "New Type",
    parameters: [
      {
        name: "UIPATH_API_KEY",
        value: "",
        required: true,
        format: "0",
        description:""
      },
      {
        name: "UIPATH_ORCHESTRATOR_URL",
        value: "",
        required: true,
        format: "0",
        description:""
      },
      {
        name: "UIPATH_PROJECT_ID",
        value: "",
        required: false,
        format: "0",
        description:""
      },
      {
        name: "ENABLED",
        value: "N",
        required: true,
        format: "5",
        description:""
      },
    ],
  },
  {
    name: "Azure Resources",
    blockVersion: "1.0.0",
    blockIdentifier: null,
    blockLabel: "Azure Resources",
    blockType: "Azure",
    description: "Connect to Azure Resources",
    typeName:
      "CN.Connections.ProcessBlocks.OfTypeExternal.ExternalDataHandlerAzure",
    baseTypeName: "External",
    category: "External",
    libraryType: "New Type",
    parameters: [
      {
        name: "AZURE_CONNECTION_STRING",
        value: "",
        required: true,
        format: "0",
        description:""
      },
      {
        name: "AZURE_RESOURCE_NAME",
        value: "",
        required: true,
        format: "0",
        description:""
      },
      {
        name: "AZURE_OPERATION",
        value: "",
        required: true,
        format: "0",
        description:""
      },
      {
        name: "ENABLED",
        value: "N",
        required: true,
        format: "5",
        description:""
      },
    ],
  },
  {
    name: "Access Procure Wizard",
    blockVersion: "1.0.0",
    blockIdentifier: null,
    blockLabel: "Access Procure Wizard",
    blockType: "Azure",
    description: "Integrations to and from ProcureWizard",
    typeName:
      "CN.Connections.ProcessBlocks.OfTypeExternal.ExternalDataHandlerAzure",
    baseTypeName: "External",
    category: "External",
    libraryType: "New Type",
    parameters: [
      {
        name: "AZURE_CONNECTION_STRING",
        value: "",
        required: true,
        format: "0",
        description:""
      },
      {
        name: "AZURE_RESOURCE_NAME",
        value: "",
        required: true,
        format: "0",
        description:""
      },
      {
        name: "AZURE_OPERATION",
        value: "",
        required: true,
        format: "0",
        description:""
      },
      {
        name: "ENABLED",
        value: "N",
        required: true,
        format: "5",
        description:""
      },
    ],
  },
  {
    name: "Access EPOS",
    blockVersion: "1.0.0",
    blockIdentifier: null,
    blockLabel: "Access EPOS",
    blockType: "Azure",
    description: "Integrations to and from Access EPOS",
    typeName:
      "CN.Connections.ProcessBlocks.OfTypeExternal.ExternalDataHandlerAzure",
    baseTypeName: "External",
    category: "External",
    libraryType: "New Type",
    parameters: [
      {
        name: "AZURE_CONNECTION_STRING",
        value: "",
        required: true,
        format: "0",
        description:""
      },
      {
        name: "AZURE_RESOURCE_NAME",
        value: "",
        required: true,
        format: "0",
        description:""
      },
      {
        name: "AZURE_OPERATION",
        value: "",
        required: true,
        format: "0",
        description:""
      },
      {
        name: "ENABLED",
        value: "N",
        required: true,
        format: "5",
        description:""
      },
    ],
  },
];


