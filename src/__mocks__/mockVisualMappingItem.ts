export const deepOrderStructure = {
  Name: "SourceOrderPW",
  SourceType: "JSON",
  NodeSet: {
    Id: "acd944e9-4c06-4979-a27a-dc6ec3e13e6e",
    Name: "Orders",
    DataType: "Array",
    Label: "Orders",
    Nodes: [
      {
        Id: "04188c84-6bac-428d-b6e6-410c279f6c25",
        Name: "OrderDate",
        DataType: "DateTime",
        Label: "OrderDate",
        Nodes: [],
      },
      {
        Id: "70b084c3-d598-4010-a2f3-44517a610462",
        Name: "Quantity",
        DataType: "Decimal",
        Label: "Quantity",
        Nodes: [],
      },
      {
        Id: "d2b373bf-48ef-43e5-8f55-a798a36e8b36",
        Name: "Price",
        DataType: "Decimal",
        Label: "Price",
        Nodes: [],
      },
      {
        Id: "89b53a29-24b6-4238-9f32-30cabaebc084",
        Name: "DeliverySet",
        DataType: "Array",
        Label: "DeliverySet",
        Nodes: [
          {
            Id: "47e2323e-6f8d-49bf-9319-4132009b8065",
            Name: "DelTime",
            DataType: "DateTime",
            Label: "DelTime",
            Nodes: [],
          },
          {
            Id: "811f06bc-7409-4418-9608-b3ba89a691b4",
            Name: "DelQty",
            DataType: "Integer",
            Label: "DelQty",
            Nodes: [],
          },
          {
            Id: "nestedBlock-1",
            Name: "DeliveryMeta",
            DataType: "Object",
            Label: "DeliveryMeta",
            Nodes: [
              {
                Id: "nestedBlock-2",
                Name: "Carrier",
                DataType: "String",
                Label: "Carrier",
                Nodes: [],
              },
              {
                Id: "nestedBlock-3",
                Name: "SubDeliveries",
                DataType: "Array",
                Label: "SubDeliveries",
                Nodes: [
                  {
                    Id: "nestedBlock-4",
                    Name: "SubId",
                    DataType: "String",
                    Label: "SubId",
                    Nodes: [],
                  },
                  {
                    Id: "nestedBlock-5",
                    Name: "SubStatus",
                    DataType: "String",
                    Label: "SubStatus",
                    Nodes: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        Id: "status-flag",
        Name: "IsComplete",
        DataType: "Boolean",
        Label: "IsComplete",
        Nodes: [],
      },
    ],
  },
};

export const destinationStructure = {
  Id: "output-root",
  Name: "OrderSummary",
  DataType: "Object",
  Label: "OrderSummary",
  Nodes: [
    {
      Id: "order_meta",
      Name: "Metadata",
      DataType: "Object",
      Label: "Metadata",
      Nodes: [
        {
          Id: "date_created",
          Name: "CreatedDate",
          DataType: "String",
          Label: "CreatedDate",
          Nodes: [],
        },
        {
          Id: "completed",
          Name: "IsCompleted",
          DataType: "Boolean",
          Label: "IsCompleted",
          Nodes: [],
        },
      ],
    },
    {
      Id: "order_items",
      Name: "Products",
      DataType: "Array",
      Label: "Products",
      Nodes: [
        {
          Id: "product_summary",
          Name: "ProductSummary",
          DataType: "Object",
          Label: "ProductSummary",
          Nodes: [
            {
              Id: "product_name",
              Name: "Name",
              DataType: "String",
              Label: "Name",
              Nodes: [],
            },
            {
              Id: "amount",
              Name: "TotalAmount",
              DataType: "Decimal",
              Label: "TotalAmount",
              Nodes: [],
            },
            {
              Id: "qty",
              Name: "Qty",
              DataType: "Integer",
              Label: "Qty",
              Nodes: [],
            },
            {
              Id: "shipments",
              Name: "Shipments",
              DataType: "Array",
              Label: "Shipments",
              Nodes: [
                {
                  Id: "shipped_on",
                  Name: "ShippedOn",
                  DataType: "DateTime",
                  Label: "ShippedOn",
                  Nodes: [],
                },
                {
                  Id: "shipment_meta",
                  Name: "Details",
                  DataType: "Object",
                  Label: "Details",
                  Nodes: [
                    {
                      Id: "courier",
                      Name: "CourierName",
                      DataType: "String",
                      Label: "CourierName",
                      Nodes: [],
                    },
                    {
                      Id: "status",
                      Name: "Status",
                      DataType: "String",
                      Label: "Status",
                      Nodes: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
