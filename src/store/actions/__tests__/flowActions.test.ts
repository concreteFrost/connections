import useStore from "store/store";
import { RFState } from "store/types/rfState";
import { initFlow, clearFlow } from "__mocks__/utils/mockFlowUtils";
import { BlockData } from "store/interfaces/IBlock";
import { Node } from "reactflow";
import {mockBlock} from "__mocks__/mockBlock";

describe("Flow Slice - flow actions", () => {
  let store: RFState;
  beforeEach(() => {
    store = useStore.getState();
    initFlow();
  });

  afterEach(() => {
    clearFlow();
    jest.clearAllMocks();
  });

  it("creates new flow with correct settings", () => {
    expect(useStore.getState().flowSlice.flow.flowName).toBe("New Flow");
  });

  it("updates flow name correctly", () => {
    store.flowSlice.setFlowName("updated flow");

    const updatedFlow = useStore.getState().flowSlice.flow;

    expect(updatedFlow.flowName).toBe("updated flow");
  });

  it("updates flow version correctly", () => {
    const oldVersion = store.flowSlice.flow.flowVersion;
    const invalidExpression = "1!";
    const letterExpression = "a";
    const validExpression = "1.2.0.4";

    //prevents invalid expression
    store.flowSlice.setFlowVersion(invalidExpression);
    expect(useStore.getState().flowSlice.flow.flowVersion).toBe(oldVersion);

    //prevents invalid expression
    store.flowSlice.setFlowVersion(letterExpression);
    expect(useStore.getState().flowSlice.flow.flowVersion).toBe(oldVersion);

    //accepts valid expression
    store.flowSlice.setFlowVersion(validExpression);
    expect(useStore.getState().flowSlice.flow.flowVersion).toBe(
      validExpression
    );
  });

  it("toggles flow enabled status", () => {
    store.flowSlice.setFlowIsEnabled();
    expect(useStore.getState().flowSlice.flow.isEnabled).toBe("false");

    store.flowSlice.setFlowIsEnabled();
    expect(useStore.getState().flowSlice.flow.isEnabled).toBe("true");
  });

  it("clears out flow data on flow close", () => {
    store.flowSlice.closeFlow();
    expect(useStore.getState().flowSlice.flow.flowIdentifier).toBe(null);
  });
});

describe("Flow Slice - block actions", () => {
  let store: RFState;
  beforeEach(() => {
    store = useStore.getState();
    initFlow();
    useStore.getState().flowSlice.flow.visual.blocks[0].selected = true
  });

  afterEach(() => {
    clearFlow();
    jest.clearAllMocks();
  });

  it("changes block name", () => {
    const newBlockName = "some new name";
    store.flowSlice.setBlockName("some new name");

    expect(useStore.getState().flowSlice.flow.blockData[0].blockLabel).toBe(
      newBlockName
    );
  });

  it("changes block description", () => {
    const newBlockDesc = "some new desc";
    store.flowSlice.setBlockDescription(newBlockDesc);

    expect(useStore.getState().flowSlice.flow.blockData[0].description).toBe(
      newBlockDesc
    );
  });

  it("changes block color", () => {
    const newBlockColor = "#FFFFFA";
    store.flowSlice.setBlockColor(newBlockColor);

    expect(useStore.getState().flowSlice.flow.visual.blocks[0].data.color).toBe(
      newBlockColor
    );
  });

  it("deletes block/blocks both from visual and block data", () => {

    const blocksToDelete: Node<any>[] = useStore
      .getState()
      .flowSlice.flow.visual.blocks.filter((x: Node) => x.selected === true);

    useStore.getState().flowSlice.deleteBlock();

    const flow = useStore.getState().flowSlice.flow;

    blocksToDelete.forEach((b: Node) => {
      expect(flow.visual.blocks.includes(b)).toBe(false); // checking visual object
      expect(
        flow.blockData.every((x: BlockData) => x.blockIdentifier === b.id)
      ).toBe(false); //checking block data object
    });
  });

  it("adds new block", () => {
    const prevBlocksLength =
      useStore.getState().flowSlice.flow.visual.blocks.length;
    useStore.getState().flowSlice.addBlock(mockBlock, 0, 0);

    expect(
      useStore.getState().flowSlice.flow.visual.blocks.length
    ).toBeGreaterThan(prevBlocksLength);
  });

  it("changes selected parameter",()=>{
    const parameterToChange =useStore.getState().flowSlice.flow.blockData[0].parameters[0].name;
    
    useStore.getState().flowSlice.setStringParameter(parameterToChange,'new value');
    console.log(useStore.getState().flowSlice.flow.blockData[0].parameters)
  })
});
``