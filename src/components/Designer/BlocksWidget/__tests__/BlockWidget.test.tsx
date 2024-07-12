import BlocksWidget from "../BlocksWidget";
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
import React from "react";

function initTestFlow() {
  useStore.setState((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      flow: mockFlowStructure,
    },
  }));
}

const expandModalFn = jest.spyOn(React, "useState");
const allignBlocksFn = jest.spyOn(
  useStore.getState().flowSlice,
  "allignSelectedBlocks"
);
const setBlocksColorFn = jest.spyOn(
  useStore.getState().flowSlice,
  "setSelectedBlocksColors"
);
const deleteMultipleBlocksFn = jest.spyOn(
  useStore.getState().flowSlice,
  "deleteMultupleBlocks"
);

describe("Blocks Widget component", () => {
  beforeEach(() => {
    initTestFlow();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderAndOpenModal = async () => {
    render(<BlocksWidget />);
    const editBtn = screen.getByRole("button", { name: "EDIT" });

    await act(async () => {
      await userEvent.click(editBtn);
    });

    await waitFor(() => {
      expect(expandModalFn).toHaveBeenCalled();
      expect(screen.queryByText("Set Color")).toBeInTheDocument();
    });

    return editBtn;
  };

  const closeModal = async (editBtn: HTMLButtonElement) => {
    await act(async () => {
      await userEvent.click(editBtn);
    });

    await waitFor(() => {
      expect(expandModalFn).toHaveBeenCalled();
      expect(screen.queryByText("Set Color")).not.toBeInTheDocument();
    });
  };

  it("renders component", () => {
    render(<BlocksWidget />);
    expect(screen.getByText("QUICK EDIT")).toBeInTheDocument();
  });
  it("toggles modal window on btn click", async () => {
    const editBtn = (await renderAndOpenModal()) as HTMLButtonElement;
    await closeModal(editBtn);
  });

  it("changes blocks colors", async () => {
    (await renderAndOpenModal()) as HTMLButtonElement;

    const colorInput = screen.getByTestId(
      "test_set_group_color"
    ) as HTMLInputElement;
    expect(colorInput).toBeInTheDocument();

    const newColorValue = "#fffffa";

    await act(async () => {
      fireEvent.change(colorInput, { target: { value: newColorValue } });
    });

    await waitFor(() => {
      expect(colorInput.value).toBe(newColorValue);
      expect(setBlocksColorFn).toHaveBeenCalledTimes(1);
    });
  });

  it("alligns blocks on button click", async () => {
    (await renderAndOpenModal()) as HTMLButtonElement;

    const allignBtnX = screen.getByTestId("test_allign_blocks_btn_x");
    expect(allignBtnX).toBeInTheDocument();

    await act(async () => {
      userEvent.click(allignBtnX);
    });

    await waitFor(() => {
      expect(allignBlocksFn).toHaveBeenCalled();
    });

    const allignBtnY = screen.getByTestId("test_allign_blocks_btn_y");
    expect(allignBtnX).toBeInTheDocument();

    await act(async () => {
      userEvent.click(allignBtnY);
    });

    expect(allignBlocksFn).toHaveBeenCalled();
  });

  it("deletes block groups on btn click", async () => {
    (await renderAndOpenModal()) as HTMLButtonElement;

    const deleteBtn = screen.getByTestId("test_delete_blocks_group_btn");

    await act(async () => {
      userEvent.click(deleteBtn);
    });

    await waitFor(() => {
      expect(deleteMultipleBlocksFn).toHaveBeenCalledTimes(1);
    });
  });
});
