export const mockedBlocks = [
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