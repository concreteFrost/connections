import PropertiesInput, { PropertiesInputProps } from "../PropertiesInput";
import { render, screen, act, fireEvent } from "@testing-library/react";
import useStore from "store/store";
import { RFState } from "store/types/rfState";
import mockFlowStructure from "__mocks__/mockFlow";

const selectedBlock = {
  ...mockFlowStructure.visual.blocks[0],
  id: "new",
  selected: true,
};

const updatedMockStructure = {
  ...mockFlowStructure,
  visual: {
    ...mockFlowStructure.visual,
    blocks: [...mockFlowStructure.visual.blocks, selectedBlock], // Spread the array, not the object
  },
};

let props: PropertiesInputProps;
const setStringParameter = jest.spyOn(
  useStore.getState().flowSlice,
  "setStringParameter"
);
const setBigIntParameter = jest.spyOn(
  useStore.getState().flowSlice,
  "setBigIntParameter"
);

describe("Properties Input component", () => {
  beforeEach(() => {
    useStore.setState((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        flow: updatedMockStructure,
      },
    }));

    props = {
      blockData: useStore.getState().flowSlice.flow.blockData[0].parameters[0],
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders component if any block is selected", () => {
    render(<PropertiesInput {...props} />);

    expect(screen.getByText(/FTP_URL/)).toBeInTheDocument();
  });

  it("assigns correct input type", () => {
    render(<PropertiesInput {...props} />);

    const input = screen.getByTestId(
      "test_properties_input"
    ) as HTMLInputElement;

    expect(input.type).toBe("text");
  });

  it("calling set parameter value function from store", async () => {
    render(<PropertiesInput {...props} />);

    const input = screen.getByTestId(
      "test_properties_input"
    ) as HTMLInputElement;

    await act(async () => {
      await fireEvent.change(input, { target: { value: "test" } });
    });

    expect(setStringParameter).toHaveBeenCalled();
    expect(setStringParameter).toHaveBeenCalledTimes(1);
  });

  it("not calling other functions", async () => {
    render(<PropertiesInput {...props} />);

    const input = screen.getByTestId(
      "test_properties_input"
    ) as HTMLInputElement;

    await act(async () => {
      await fireEvent.change(input, { target: { value: "test" } });
    });

    expect(setBigIntParameter).not.toHaveBeenCalled();
  });
});
