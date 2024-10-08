import mockFlowStructure from "__mocks__/mockFlow";
import { FlowStructure } from "store/interfaces/Iflow";
import useStore from "store/store";
import { RFState } from "store/types/rfState";

function createAndAddFlowsToTabs(numberToCreate: number): FlowStructure[] {
  let i = 0;
  const arr: FlowStructure[] = [];
  while (i < numberToCreate) {
    const newFlow = useStore.getState().flowSlice.createFlow();
    useStore.getState().flowSlice.addFlowToTabs(newFlow);
    arr.push(newFlow);
    i++;
  }
  return arr;
}

describe("Flow Slice - tabs actions", () => {
  let store: RFState;
  beforeEach(() => {
    store = useStore.getState();
    jest.clearAllMocks();
    useStore.getState().flowSlice.clearFlowTabs();
  });
  it("should add flow to tab", () => {
    const newFlow = mockFlowStructure;

    store.flowSlice.addFlowToTabs(newFlow);
    expect(useStore.getState().flowSlice.allFlows.length).toBe(1);
  });
  it("should change flow name in tab", () => {
    const newFlow = mockFlowStructure;
    store.flowSlice.addFlowToTabs(newFlow);

    const oldFlowName = newFlow.flowName;
    store.flowSlice.setFlowNameInTabs("new name");

    expect(useStore.getState().flowSlice.allFlows[0].flowName).not.toEqual(
      oldFlowName
    );
  });
  it("should get flow snapshot", () => {
    const flowArray: FlowStructure[] = createAndAddFlowsToTabs(2);

    //checking if the current flow is flow2
    expect(useStore.getState().flowSlice.flow.flowIdentifier).toBe(
      flowArray[1].flowIdentifier
    );

    //checking if the current flow is flow1
    store.flowSlice.getFlowFromSnapshot(flowArray[0]);
    expect(useStore.getState().flowSlice.flow.flowIdentifier).toBe(
      flowArray[0].flowIdentifier
    );
  });
  it("should remove flow from tab", () => {
    const flowArray: FlowStructure[] = createAndAddFlowsToTabs(10);

    store.flowSlice.removeFromTab(
      useStore.getState().flowSlice.allFlows[1].flowIdentifier
    );
    expect(useStore.getState().flowSlice.allFlows.length).toBe(9);
  });
  it("should clear all flow tabs", () => {
    const flowArray: FlowStructure[] = createAndAddFlowsToTabs(10);

    store.flowSlice.clearFlowTabs();
    expect(useStore.getState().flowSlice.allFlows.length).toBe(0);
  });
});
