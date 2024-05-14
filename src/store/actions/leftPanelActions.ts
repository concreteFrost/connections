import blockParametersType from "../constants/blockConst";

function setDefaultValueAndFormat(dataType: number) {
  switch (dataType) {
    case 0:
      return blockParametersType.string;
    case 1:
      return blockParametersType.integer;
    case 2:
      return blockParametersType.float;
    case 3:
      return blockParametersType.dateTime;
    case 4:
      return blockParametersType.boolean;
    case 5:
      return blockParametersType.booleanYN;
    case 6:
      return blockParametersType.execution;
    case 7:
      return blockParametersType.bigInt;
    case 8:
      return blockParametersType.blockRef;
    default:
      return blockParametersType.default;
  }
}

export const getBlocksList = (set: any) => (data: any) => {
  const updatedNodesList = [];

  for (let d of data) {
    updatedNodesList.push({
      type: "pointer",
      visualData: {
        color: "#FFFFFF",
        icon: d.name.toLowerCase().split(" ").join("_"),
      },
      data: {
        name: d.name,
        blockVersion: "4.1.8",
        blockIdentifier: null,
        blockLabel: d.name,
        blockType: d.name,
        description: d.description,
        typeName: d.libraryType,
        baseTypeName: d.category,
        // ehDirective: null,
        parameters: d.parameters.map((parameter: any) => {
          return {
            name: parameter.name,
            value: parameter.parameterDefault,
            required: parameter.constraints > 0 ? true : false,
            format: setDefaultValueAndFormat(parameter.dataType)?.format,
          };
        }),
        extendedParameters: []
      },
    });
  }

  for (let block of mockedBlocks) {

    updatedNodesList.push({
      type: "pointer",
      visualData: {
        color: "#FFFFFF",
        icon: block.name.toLowerCase().split(" ").join("_"),
      },
      data: {
        name: block.name,
        blockVersion: "4.1.8",
        blockIdentifier: null,
        blockLabel: block.name,
        blockType: block.name,
        description: block.description,
        typeName: block.libraryType,
        baseTypeName: block.category,
        // ehDirective: null,
        parameters: block.parameters.map((parameter: any) => {
          return {
            name: parameter.name,
            value: setDefaultValueAndFormat(parameter.dataType)?.value,
            required: parameter.constraints > 0 ? true : false,
            format: setDefaultValueAndFormat(parameter.dataType)?.format,
          };
        }),
      },

    })
  }

  set({ blockList: updatedNodesList });
};

const leftPanelActions = {
  getBlocksList: getBlocksList,
};

export default leftPanelActions;

const mockedBlocks = [
  {
      "name": "SAP",
      "blockVersion": "1.0.0",
      "blockIdentifier": null,
      "blockLabel": "SAP",
      "blockType": "SAP",
      "description": "Configure integrations with SAP Cloud Integration for Data Services",
      "typeName": "CN.Connections.ProcessBlocks.OfTypeExternal.ExternalDataHandlerSAP",
      "baseTypeName": "External",
      "category": "External",
      "libraryType": "New Type",
      "parameters": [
          {
              "name": "SAP_URL",
              "value": "",
              "required": true,
              "format": "0"
          },
          {
              "name": "SAP_PORT",
              "value": 0,
              "required": false,
              "format": "1"
          },
          {
              "name": "SAP_USERNAME",
              "value": "",
              "required": true,
              "format": "0"
          },
          {
              "name": "SAP_PASSWORD",
              "value": "",
              "required": true,
              "format": "0"
          },
          {
              "name": "SAP_CONNECTION_TYPE",
              "value": "",
              "required": true,
              "format": "0"
          },
          {
              "name": "SAP_OBJECT",
              "value": "",
              "required": false,
              "format": "0"
          },
          {
              "name": "SAP_DESTINATION",
              "value": "",
              "required": false,
              "format": "0"
          },
          {
              "name": "SAP_TIMEOUT",
              "value": 0,
              "required": false,
              "format": "1"
          },
          {
              "name": "ENABLED",
              "value": "N",
              "required": true,
              "format": "5"
          }
      ]
  },

  {
      "name": "UiPath",
      "blockVersion": "1.0.0",
      "blockIdentifier": null,
      "blockLabel": "UiPath",
      "blockType": "UiPath",
      "description": "Connects to UiPath Automation Hub",
      "typeName": "CN.Connections.ProcessBlocks.OfTypeExternal.ExternalDataHandlerUiPath",
      "baseTypeName": "External",
      "category": "External",
      "libraryType": "New Type",
      "parameters": [
          {
              "name": "UIPATH_API_KEY",
              "value": "",
              "required": true,
              "format": "0"
          },
          {
              "name": "UIPATH_ORCHESTRATOR_URL",
              "value": "",
              "required": true,
              "format": "0"
          },
          {
              "name": "UIPATH_PROJECT_ID",
              "value": "",
              "required": false,
              "format": "0"
          },
          {
              "name": "ENABLED",
              "value": "N",
              "required": true,
              "format": "5"
          }
      ]
  },

  {
      "name": "Azure Resources",
      "blockVersion": "1.0.0",
      "blockIdentifier": null,
      "blockLabel": "Azure Resources",
      "blockType": "Azure",
      "description": "Connect to Azure Resources",
      "typeName": "CN.Connections.ProcessBlocks.OfTypeExternal.ExternalDataHandlerAzure",
      "baseTypeName": "External",
      "category": "External",
      "libraryType": "New Type",
      "parameters": [
          {
              "name": "AZURE_CONNECTION_STRING",
              "value": "",
              "required": true,
              "format": "0"
          },
          {
              "name": "AZURE_RESOURCE_NAME",
              "value": "",
              "required": true,
              "format": "0"
          },
          {
              "name": "AZURE_OPERATION",
              "value": "",
              "required": true,
              "format": "0"
          },
          {
              "name": "ENABLED",
              "value": "N",
              "required": true,
              "format": "5"
          }
      ]
  },

  {
      "name": "Access Procure Wizard",
      "blockVersion": "1.0.0",
      "blockIdentifier": null,
      "blockLabel": "Access Procure Wizard",
      "blockType": "Azure",
      "description": "Integrations to and from ProcureWizard",
      "typeName": "CN.Connections.ProcessBlocks.OfTypeExternal.ExternalDataHandlerAzure",
      "baseTypeName": "External",
      "category": "External",
      "libraryType": "New Type",
      "parameters": [
          {
              "name": "AZURE_CONNECTION_STRING",
              "value": "",
              "required": true,
              "format": "0"
          },
          {
              "name": "AZURE_RESOURCE_NAME",
              "value": "",
              "required": true,
              "format": "0"
          },
          {
              "name": "AZURE_OPERATION",
              "value": "",
              "required": true,
              "format": "0"
          },
          {
              "name": "ENABLED",
              "value": "N",
              "required": true,
              "format": "5"
          }
      ]
  },

  {
      "name": "Access EPOS",
      "blockVersion": "1.0.0",
      "blockIdentifier": null,
      "blockLabel": "Access EPOS",
      "blockType": "Azure",
      "description": "Integrations to and from Access EPOS",
      "typeName": "CN.Connections.ProcessBlocks.OfTypeExternal.ExternalDataHandlerAzure",
      "baseTypeName": "External",
      "category": "External",
      "libraryType": "New Type",
      "parameters": [
          {
              "name": "AZURE_CONNECTION_STRING",
              "value": "",
              "required": true,
              "format": "0"
          },
          {
              "name": "AZURE_RESOURCE_NAME",
              "value": "",
              "required": true,
              "format": "0"
          },
          {
              "name": "AZURE_OPERATION",
              "value": "",
              "required": true,
              "format": "0"
          },
          {
              "name": "ENABLED",
              "value": "N",
              "required": true,
              "format": "5"
          }
      ]
  }



]