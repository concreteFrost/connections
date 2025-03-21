import { RFState } from "../../types/rfState";
import { BlockData } from "interfaces/IBlock";
import { BlockParameters } from "interfaces/IBlock";
import { Visual } from "interfaces/Iflow";
import { v4 as uuidv4 } from "uuid";
import { getAccessToken } from "store/actions/storageActions";
import { getDraftListApi } from "api/draft";
import markerEnd from "../../constants/edgeConst";
import ConnectionsEdge from "interfaces/IConnectionsEdges";

export function initializeFlow<IFlowData>(
  initialNodes: object,
  initialEdges: object,
  flowId?: string
) {
  return {
    blockData: [],
    created: new Date(),
    createdBy: getAccessToken().userName,
    flowIdentifier: flowId ? flowId : null,
    // flowName: "New Flow" + uuidv4().split("-")[0],
    flowName: flowId,
    flowConfig: "Debug",
    flowVersion: "1.0.0.0",
    isEnabled: "true",
    lastAmended: new Date(),
    lastAmendedBy: getAccessToken().userName,
    startBlock: "",
    serverIdentifier: uuidv4(),
    substitutions: [],
    visual: {
      blocks: initialNodes,
      edges: initialEdges,
    },
  } as IFlowData;
}

export function setFlow(data: any, set: any, get: () => RFState) {
  console.log(data);
  set((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      flow: {
        ...state.flowSlice.flow,
        created: data.created,
        createdBy: data.createdBy,
        flowConfig: data.flowConfig,
        flowIdentifier: data.flowIdentifier,
        flowVersion: data.flowVersion,
        flowName: data.flowName,
        isEnabled: data.isEnabled,
        lastAmended: data.lastAmended,
        lastAmendedBy: data.lastAmendedBy,
        startBlock: data.startBlock,
        serverIdentifier: data.serverIdentifier,
        blockData: data.blockData.map((b: BlockData) => {
          return {
            name: b.name,
            blockIdentifier: b.blockIdentifier,
            blockVersion: b.blockVersion,
            blockLabel: b.blockLabel,
            blockType: b.blockType,
            description: b.description,
            typeName: b.typeName,
            baseTypeName: b.baseTypeName,
            ehDirective: b.ehDirective,
            parameters: b.parameters.map((p: BlockParameters) => {
              return {
                name: p.name,
                value: p.value,
                required: p.required,
                format: p.format,
                description: p.description,
                // constraints: p.constraints,
                // placeholder: p.placeholder
              };
            }),
            extendedParameters: b.extendedParameters.map(
              (p: BlockParameters) => {
                return {
                  name: p.name,
                  value: p.value,
                };
              }
            ),
          };
        }),
        visual: {
          ...state.flowSlice.flow.visual,
          blocks: data.visual.blocks.map((b: Visual) => {
            return {
              id: b.id,
              type: "pointer",
              data: b.data,
              position: b.position,
            };
          }),

          edges: data.visual.edges.map((e: ConnectionsEdge) => {
            return {
              id: e.id,
              source: e.source,
              target: e.target,
              type: "button",
              markerEnd,
              priority: e.priority,
            };
          }),
        },
        substitutions: data.substitutions.map((sub: any) => {
          return {
            subKey: sub.subKey,
            subConfigs: sub.subConfigs.map((config: any) => {
              return {
                configName: config.configName,
                configValue: config.configValue,
              };
            }),
          };
        }),
      },
    },
  }));
}

export function updateFlowAfterSaving(
  set: any,
  flow: any,
  saveFlowMessage: string
) {
  set((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      flow: {
        ...state.flowSlice.flow,
        flowVersion: flow.flowVersion,
      },
    },
    modalWindowsSlice: {
      ...state.modalWindowsSlice,
      messageModal: {
        ...state.modalWindowsSlice.messageModal,
        isVisible: true,
        message: saveFlowMessage,
      },
    },
  }));
}

export function parseFloatVersion(flowVersion: number) {
  let flowToInt = flowVersion.toString();
  let result = "";
  for (let ch of flowToInt) {
    result += ch + ".";
  }
  return result.slice(0, result.length - 1);
}

export function flowVersionToInt(flowVersion: string) {
  return parseInt(flowVersion.replace(/\./g, ""));
}

export function checkExistingFlowInDataBase(flowName: string) {
  return new Promise((resolve, reject) => {
    getDraftListApi()
      .then((res: any) => {
        const matchingObject = Object.values(res.data.draftFlows)
          .flatMap((folderArray: any) => folderArray)
          .find((item: any) => item.flowName === flowName);

        if (matchingObject) {
          // You can do further processing or resolve with the matching object
          resolve(matchingObject);
        } else {
          resolve(null); // Resolve with null or any other indicator if the flow name is not found
        }
      })
      .catch((error: any) => {
        reject(error);
      });
  });
}
