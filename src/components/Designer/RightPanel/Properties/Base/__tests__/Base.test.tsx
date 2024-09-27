import Base from "../Base";
import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

describe("Base component", () => {
  beforeEach(() => {
    useStore.setState((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        flow: updatedMockStructure,
      },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("changes block name", async () => {
    render(<Base />);

    const input = screen.getByPlaceholderText("Block Name") as HTMLInputElement;

    const newName = "new block";

    await act(async () => {
      await userEvent.clear(input);
      await userEvent.type(input, newName);
    });

    await waitFor(() => {
      expect(input.value).toBe(newName);
    });
  });

  it("changes block description", async () => {
    render(<Base />);

    const input = screen.getByPlaceholderText(
      "Description"
    ) as HTMLInputElement;

    const newName = "new desc";

    await act(async () => {
      await userEvent.clear(input);
      await userEvent.type(input, newName);
    });

    await waitFor(() => {
      expect(input.value).toBe(newName);
    });
  });

  it("keeps default color as #ffffff", () => {
    render(<Base />);

    const input = screen.getByLabelText("COLOR") as HTMLInputElement;

    expect(input).toBeInTheDocument();

    expect(input.value).toBe("#ffffff");
  });

  it("changes block color", async () => {
    render(<Base />);

    const colorInput = screen.getByTestId(
      "test_block_color_change"
    ) as HTMLInputElement;

    expect(colorInput).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(colorInput, { target: { value: "#aaaaab" } });
    });

    expect(colorInput.value).toBe("#aaaaab");
  });

  it("prevents color input from receiving empty value", async () => {
    render(<Base />);

    const colorInput = screen.getByTestId(
      "test_block_color_change"
    ) as HTMLInputElement;

    expect(colorInput).toBeInTheDocument();

    await act(async () => {
      fireEvent.change(colorInput, { target: { value: "#" } });
    });

    expect(colorInput.value).toBe("#000000");
  });
});
