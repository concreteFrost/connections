import { FlowData } from "store/interfaces/Iflow";

const mockFlowStructure: any = {
  blockData: [
    {
      blockVersion: "4.1.8",
      blockIdentifier: "739e0e2e-1b1c-4806-a41a-d22cb31e87d6",
      blockLabel: "FTP",
      blockType: "FTP",
      description: "Performs FTP operations",
      typeName:
        "CN.Connections.ProcessBlocks.OfTypeExternal.ExternalDataHandlerFTP",
      baseTypeName: "External",
      name: "FTP",
      parameters: [
        {
          name: "FTP_URL",
          value: "",
          required: true,
          format: "0",
        },
        {
          name: "FTP_PORT",
          value: "22",
          required: false,
          format: "1",
        },
        {
          name: "FTP_LOGIN",
          value: "",
          required: true,
          format: "0",
        },
        {
          name: "FTP_PASSWORD",
          value: "",
          required: true,
          format: "0",
        },
        {
          name: "FTP_HOSTKEY",
          value: "",
          required: false,
          format: "0",
        },
        {
          name: "FTP_DIRECTION",
          value: "U",
          required: true,
          format: "0",
        },
        {
          name: "FTP_SOURCE",
          value: "",
          required: false,
          format: "0",
        },
        {
          name: "FTP_DEST",
          value: "",
          required: false,
          format: "0",
        },
        {
          name: "FTP_FILEMASK",
          value: "",
          required: false,
          format: "0",
        },
        {
          name: "FTP_SECURE_PROTOCOL",
          value: "Y",
          required: true,
          format: "0",
        },
        {
          name: "FTP_TIMEOUT",
          value: "5000",
          required: false,
          format: "1",
        },
        {
          name: "REMOVE_SOURCE",
          value: "Y",
          required: true,
          format: "5",
        },
        {
          name: "ENABLED",
          value: "Y",
          required: true,
          format: "5",
        },
        {
          name: "EXECUTION_INSTRUCTIONS",
          value: "N",
          required: true,
          format: "6",
        },
        {
          name: "TRACKING_ENABLED",
          value: "N",
          required: false,
          format: "5",
        },
        {
          name: "TRACK_ID",
          value: "",
          required: false,
          format: "7",
        },
        {
          name: "TRACKING_DATA",
          value: "",
          required: false,
          format: "0",
        },
        {
          name: "XML_BASE",
          value: "",
          required: false,
          format: "0",
        },
      ],
      extendedParameters: [],
    },
  ],
  created: new Date(),
  createdBy: "iliaM",
  flowIdentifier: "7527fdb6-4ebe-4987-ac70-807d65b2b7da",
  flowName: "New Flow",
  flowConfig: "Debug",
  flowVersion: "1.0.0.0",
  isEnabled: "true",
  lastAmended: new Date(),
  lastAmendedBy: "iliaM",
  startBlock: "",
  serverIdentifier: "3c66f5e0-c2cd-465b-9754-f11826a2fa43",
  substitutions: [],
  visual: {
    blocks: [
      {
        id: "739e0e2e-1b1c-4806-a41a-d22cb31e87d6",
        type: "pointer",
        data: {
          color: "#FFFFFF",
          icon: "ftp",
        },
        position: {
          x: 649,
          y: 462,
        },
        width: 170,
        height: 70,
        selected:true,
      },
    ],
    edges: [],
  },
};

export default mockFlowStructure;
