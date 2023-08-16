export const flow ={
  "ConnectionsFlow": {
    "ServerIdentifier": "8db12f39-fab9-4397-a90e-b6ca9e12010f",
    "FlowName": "Test V5 Flow",
    "FlowIdentifier": "8e45a245-5761-4d39-bab4-eb64b9e0d3ac",
    "FlowVersion": "1.0.0.0",
    "FlowConfig": "Debug",
    "IsEnabled": "true",
    "StartBlock": "\n  ",
    "CreatedBy": "ianm",
    "Created": "12/07/2023 10:23:27",
    "LastAmendedBy": "admin",
    "LastAmended": "09/08/2023 18:29:14",
    "BlockData": [
      {
        "Name": "Input:TicketStart",
        "BlockIdentifier": "df4b3f0a-e07c-4fc8-9d4b-c85082eb0c48",
        "BlockVersion": "4.1.8",
        "BlockLabel": "Input:TicketStart",
        "BlockType": "Input XML",
        "Description": "This block is used to import data from a properly formatted XML file.  A schema for which to validate against may also be specified.",
        "TypeName": "CN.Connections.ProcessBlocks.OfTypeInput.XmlInputProvider",
        "BaseTypeName": "Input",
        "Parameters": [
          {
            "Name": "FILE_NAME",
            "Value": "{ConfigDir}\\TicketStart.xml",
            "Required": "true",
            "Format": "0"
          },
          {
            "Name": "ENABLED",
            "Value": "Y",
            "Required": "true",
            "Format": "5"
          },
          {
            "Name": "EXECUTION_INSTRUCTIONS",
            "Value": "N",
            "Required": "true",
            "Format": "6"
          },
          {
            "Name": "TRACKING_ENABLED",
            "Value": "\n          ",
            "Required": "false",
            "Format": "5"
          },
          {
            "Name": "TRACK_ID",
            "Value": "\n          ",
            "Required": "false",
            "Format": "7"
          },
          {
            "Name": "TRACKING_DATA",
            "Value": "\n          ",
            "Required": "false"
          },
          {
            "Name": "SCHEMA",
            "Value": "\n          ",
            "Required": "false"
          },
          {
            "Name": "TRANSLATION",
            "Value": "\n          ",
            "Required": "false"
          }
        ],
        "ExtendedParameters": [
        ]
      },
      {
        "Name": "Schedule:DailySalesTotals",
        "BlockIdentifier": "1b86f2d0-050a-4517-a956-80b41dedabd0",
        "BlockVersion": "4.1.8",
        "BlockLabel": "Schedule:DailySalesTotals",
        "BlockType": "ScheduleTrigger",
        "Description": "Triggers a nominated process flow block based upon scheduling criteria",
        "TypeName": "CN.Connections.ProcessBlocks.OfTypeFunction.ScheduleTrigger",
        "BaseTypeName": "Function",
        "Parameters": [
          {
            "Name": "DELAY",
            "Value": "100",
            "Required": "true",
            "Format": "1"
          },
          {
            "Name": "NEXT_BLOCK",
            "Value": "df4b3f0a-e07c-4fc8-9d4b-c85082eb0c48",
            "Required": "true",
            "Format": "8"
          },
          {
            "Name": "SCHEDULE_INFO",
            "Value": "\n          ",
            "Required": "false"
          },
          {
            "Name": "ENABLED",
            "Value": "Y",
            "Required": "true",
            "Format": "5"
          },
          {
            "Name": "EXECUTION_INSTRUCTIONS",
            "Value": "T",
            "Required": "true",
            "Format": "6"
          },
          {
            "Name": "TRACKING_ENABLED",
            "Value": "\n          ",
            "Required": "false",
            "Format": "5"
          },
          {
            "Name": "TRACK_ID",
            "Value": "\n          ",
            "Required": "false",
            "Format": "7"
          },
          {
            "Name": "TRACKING_DATA",
            "Value": "\n          ",
            "Required": "false"
          }
        ],
        "ExtendedParameters": [
          {
            "Name": "SCHEDULE_INFO:DAILY",
            "Value": "D,18/02/2020,07:00"
          }
        ]
      },
      {
        "Name": "Transformer:ToTotals",
        "BlockIdentifier": "92b24b0a-94d6-4a96-bc1f-bf5969f0257e",
        "BlockVersion": "4.1.8",
        "BlockLabel": "Transformer:ToTotals",
        "BlockType": "Transformer",
        "Description": "Transforms the data based upon an XSLT",
        "TypeName": "CN.Connections.ProcessBlocks.OfTypeFunction.Transformer",
        "BaseTypeName": "Function",
        "Parameters": [
          {
            "Name": "FILE_NAME",
            "Value": "{ConfigDir}\\TicketTotalOut2.xslt",
            "Required": "true",
            "Format": "0"
          },
          {
            "Name": "ENABLED",
            "Value": "Y",
            "Required": "true",
            "Format": "5"
          },
          {
            "Name": "EXECUTION_INSTRUCTIONS",
            "Value": "N",
            "Required": "true",
            "Format": "6"
          },
          {
            "Name": "TRACKING_ENABLED",
            "Value": "\n          ",
            "Required": "false",
            "Format": "6"
          },
          {
            "Name": "TRACK_ID",
            "Value": "\n          ",
            "Required": "false",
            "Format": "7"
          },
          {
            "Name": "TRACKING_DATA",
            "Value": "\n          ",
            "Required": "false"
          }
        ],
        "ExtendedParameters": [
        ]
      },
      {
        "Name": "Transformer:ToSummaryFormat",
        "BlockIdentifier": "28e8bb3b-66c9-482a-aac2-b5ccb7a348f0",
        "BlockVersion": "4.1.8",
        "BlockLabel": "Transformer:ToSummaryFormat",
        "BlockType": "Transformer",
        "Description": "Transforms the data based upon an XSLT",
        "TypeName": "CN.Connections.ProcessBlocks.OfTypeFunction.Transformer",
        "BaseTypeName": "Function",
        "Parameters": [
          {
            "Name": "FILE_NAME",
            "Value": "{ConfigDir}\\TicketFormatOut.xslt",
            "Required": "true",
            "Format": "0"
          },
          {
            "Name": "ENABLED",
            "Value": "Y",
            "Required": "true",
            "Format": "5"
          },
          {
            "Name": "EXECUTION_INSTRUCTIONS",
            "Value": "N",
            "Required": "true",
            "Format": "6"
          },
          {
            "Name": "TRACKING_ENABLED",
            "Value": "\n          ",
            "Required": "false",
            "Format": "5"
          },
          {
            "Name": "TRACK_ID",
            "Value": "\n          ",
            "Required": "false",
            "Format": "7"
          },
          {
            "Name": "TRACKING_DATA",
            "Value": "\n          ",
            "Required": "false"
          }
        ],
        "ExtendedParameters": [
        ]
      },
      {
        "Name": "SQL:GetDates",
        "BlockIdentifier": "ed893a5e-dc39-41c8-b98b-96d1c3c31445",
        "BlockVersion": "4.1.8",
        "BlockLabel": "SQL:GetDates",
        "BlockType": "SQL",
        "Description": "Connects to an external SQL database and provides data integration and controlled queries",
        "TypeName": "CN.Connections.ProcessBlocks.OfTypeExternal.ExternalDataHandlerSQL",
        "BaseTypeName": "External",
        "Parameters": [
          {
            "Name": "SQL_COMMAND",
            "Value": "Execute CN_WV_GetDates",
            "Required": "true"
          },
          {
            "Name": "SQL_CONNECTION",
            "Value": "{SQLConnect}",
            "Required": "true"
          },
          {
            "Name": "COMMAND_TIMEOUT",
            "Value": "1000",
            "Required": "true",
            "Format": "1"
          },
          {
            "Name": "ENABLED",
            "Value": "Y",
            "Required": "true",
            "Format": "5"
          },
          {
            "Name": "EXECUTION_INSTRUCTIONS",
            "Value": "N",
            "Required": "true",
            "Format": "6"
          },
          {
            "Name": "TRACKING_ENABLED",
            "Value": "\n          ",
            "Required": "false",
            "Format": "5"
          },
          {
            "Name": "TRACK_ID",
            "Value": "\n          ",
            "Required": "false",
            "Format": "7"
          },
          {
            "Name": "TRACKING_DATA",
            "Value": "\n          ",
            "Required": "false"
          },
          {
            "Name": "XML_BASE",
            "Value": "\n          ",
            "Required": "false",
            "Format": "XMLPath"
          }
        ],
        "ExtendedParameters": [
          {
            "Name": "RESULT:OutputDate",
            "Value": "//Tickets,A,OutputDate"
          },
          {
            "Name": "RESULT:ReportDateFrom",
            "Value": "//Tickets,A,ReportDateFrom"
          },
          {
            "Name": "RESULT:ReportDateTo",
            "Value": "//Tickets,A,ReportDateTo"
          }
        ]
      },
      {
        "Name": "Output:DishSales",
        "BlockIdentifier": "5b7a7256-3e9d-48fe-a06b-df1e43d861b0",
        "BlockVersion": "4.1.8",
        "BlockLabel": "Output:DishSales",
        "BlockType": "Output FlatFile",
        "Description": "This block is used to export data to a properly formatted FlatFile based upon date nodes representing output lines",
        "TypeName": "CN.Connections.ProcessBlocks.OfTypeOutput.FlatfileOutputProvider",
        "BaseTypeName": "Output",
        "Parameters": [
          {
            "Name": "FILE_NAME",
            "Value": "{ArchiveDir}\\DishSalesOut_%::FileName::%.csv",
            "Required": "true",
            "Format": "0"
          },
          {
            "Name": "ALLOW_OVERWRITE",
            "Value": "Y",
            "Required": "false",
            "Format": "5"
          },
          {
            "Name": "DATA_NODE",
            "Value": "//DishSales/Sale",
            "Required": "true"
          },
          {
            "Name": "APPEND",
            "Value": "N",
            "Required": "false",
            "Format": "5"
          },
          {
            "Name": "ENABLED",
            "Value": "Y",
            "Required": "true",
            "Format": "5"
          },
          {
            "Name": "EXECUTION_INSTRUCTIONS",
            "Value": "N",
            "Required": "true",
            "Format": "6"
          },
          {
            "Name": "TRACKING_ENABLED",
            "Value": "\n          ",
            "Required": "false",
            "Format": "5"
          },
          {
            "Name": "TRACK_ID",
            "Value": "\n          ",
            "Required": "false",
            "Format": "7"
          },
          {
            "Name": "TRACKING_DATA",
            "Value": "\n          ",
            "Required": "false"
          }
        ],
        "ExtendedParameters": [
          {
            "Name": "PARAM:FileName",
            "Value": "$(PROCESSTIME)"
          }
        ]
      }
    ],
    "Visual": {
      "Blocks": [
        {
          "id": "1b86f2d0-050a-4517-a956-80b41dedabd0",
          "data": {
            "color": "#1395DE",
            "icon": "whatever"
          },
          "position": {
            "x": 50,
            "y": 50
          }

        },
        {
          "id": "df4b3f0a-e07c-4fc8-9d4b-c85082eb0c48",
          "data": {
            "color": "#139C3A",
            "icon": "whatever"
          },
          "position": {
            "x": 50,
            "y": 200
          }

        },
        {
          "id": "ed893a5e-dc39-41c8-b98b-96d1c3c31445",
          "data": {
            "color": "#DE1331",
            "icon": "whatever"
          },
          "position": {
            "x": 250,
            "y": 200
          }

        },
        {
          "id": "92b24b0a-94d6-4a96-bc1f-bf5969f0257e",
          "data": {
            "color": "#86139C",
            "icon": "whatever"
          },
          "position": {
            "x": 450,
            "y": 200
          }

        },
        {
          "id": "28e8bb3b-66c9-482a-aac2-b5ccb7a348f0",
          "data": {
            "color": "#86139C",
            "icon": "whatever"
          },
          "position": {
            "x": 450,
            "y": 300
          }

        },
        {
          "id": "5b7a7256-3e9d-48fe-a06b-df1e43d861b0",
          "data": {
            "color": "#EBEE2C",
            "icon": "whatever"
          },
          "position": {
            "x": 650,
            "y": 250
          }
        }
      ],
      "Edges": [
        {
          "id": "reactflow__edge-df4b3f0a-e07c-4fc8-9d4b-c85082eb0c48-ed893a5e-dc39-41c8-b98b-96d1c3c31445",
          "source": "df4b3f0a-e07c-4fc8-9d4b-c85082eb0c48",
          "target": "ed893a5e-dc39-41c8-b98b-96d1c3c31445"
        },
        {
          "id": "reactflow__edge-ed893a5e-dc39-41c8-b98b-96d1c3c31445-92b24b0a-94d6-4a96-bc1f-bf5969f0257e",
          "source": "ed893a5e-dc39-41c8-b98b-96d1c3c31445",
          "target": "92b24b0a-94d6-4a96-bc1f-bf5969f0257e"
        },
        {
          "id": "reactflow__edge-ed893a5e-dc39-41c8-b98b-96d1c3c31445-28e8bb3b-66c9-482a-aac2-b5ccb7a348f0",
          "source": "ed893a5e-dc39-41c8-b98b-96d1c3c31445",
          "target": "28e8bb3b-66c9-482a-aac2-b5ccb7a348f0"
        },
        {
          "id": "reactflow__edge-92b24b0a-94d6-4a96-bc1f-bf5969f0257e-5b7a7256-3e9d-48fe-a06b-df1e43d861b0",
          "source": "92b24b0a-94d6-4a96-bc1f-bf5969f0257e",
          "target": "5b7a7256-3e9d-48fe-a06b-df1e43d861b0"
        },
        {
          "id": "reactflow__edge-28e8bb3b-66c9-482a-aac2-b5ccb7a348f0-5b7a7256-3e9d-48fe-a06b-df1e43d861b0",
          "source": "28e8bb3b-66c9-482a-aac2-b5ccb7a348f0",
          "target": "5b7a7256-3e9d-48fe-a06b-df1e43d861b0"
        }
      ]
    },
    "Substitutions": [
      {
        "SubKey": "ConfigDir",
        "SubConfigs": [
          {
            "ConfigName": "Debug",
            "ConfigValue": "E:\\temp\\Wave\\Configuration"
          },
          {
            "ConfigName": "Release",
            "ConfigValue": "F:\\Connections\\Configuration"
          }
        ]
      },
      {
        "SubKey": "OutputDir",
        "SubConfigs": [
          {
            "ConfigName": "Debug",
            "ConfigValue": "E:\\temp\\Wave\\DataExchange"
          },
          {
            "ConfigName": "Release",
            "ConfigValue": "F:\\DataExchange\\TicketTest\\FTPUP"
          }
        ]
      },
      {
        "SubKey": "SQLConnect",
        "SubConfigs": [
          {
            "ConfigName": "Debug",
            "ConfigValue": "Server=MLSUPE7\\MLSUPE7;Database=ConnectionsWAVE;User=sa; password=testing;"
          },
          {
            "ConfigName": "Release",
            "ConfigValue": "Server=WAVCON01\\SQLEXPRESS;Database=ConnectionCTWAV;User=cnadmin; password=test!ing2H;"
          }
        ]
      },
      {
        "SubKey": "ArchiveDir",
        "SubConfigs": [
          {
            "ConfigName": "Debug",
            "ConfigValue": "E:\\temp\\Wave\\DataExchange"
          },
          {
            "ConfigName": "Release",
            "ConfigValue": "F:\\DataExchange\\TicketTest\\Archive"
          }
        ]
      }
    ]
  }
}