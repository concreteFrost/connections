import LeftPanel from "../LeftPanel";
import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from "@testing-library/react";
import useStore from "store/store";
import { RFState } from "store/types/rfState";
import mockFlowStructure from "__mocks__/mockFlow";

function initTestFlow() {
  useStore.setState((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      flow: mockFlowStructure,
    },
  }));
}

function resetFlowId() {
  useStore.setState((state: RFState) => ({
    flowSlice: {
      ...state.flowSlice,
      flow: { ...state.flowSlice.flow, flowIdentifier: "" },
    },
  }));
}

describe("Designer Left Panel component", () => {
  beforeEach(() => {
    initTestFlow();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders panel", () => {
    render(<LeftPanel />);
    const header = screen.getByText(/CREATE BLOCKS/);
    expect(header).toBeInTheDocument();
  });

  it("renders sections on flow init", () => {
    render(<LeftPanel />);
    const header = screen.getByText(/DATA STORE/);
    expect(header).toBeInTheDocument();
  });

  it("toggles left panel on icon click", async () => {
    render(<LeftPanel />);

    const btn = screen.getByTestId("close_designer_left_panel_btn");
    const panel = screen.getByTestId("designer_left_panel_wrapper");

    expect(panel).toHaveClass("wrapper opened");

    fireEvent.click(btn);

    expect(panel).toHaveClass("wrapper closed");

    fireEvent.click(btn);

    expect(panel).toHaveClass("wrapper opened");
  });

  it("not renders sections if flow id is empty", () => {
    resetFlowId();
    render(<LeftPanel />);
    const header = screen.queryByText(/DATA STORE/);
    expect(header).toBeNull();
  });
});
