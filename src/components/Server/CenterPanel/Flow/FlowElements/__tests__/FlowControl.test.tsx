import FlowControl, { FlowControlProps } from "../FlowControl";
import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from "@testing-library/react";
import useStore from "store/store";
import { RFState } from "shared/types/rfState";
import mockFlowStructure from "__mocks__/mockFlow";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Flow Control component", () => {
  beforeEach(() => {
    useStore.setState((state: RFState) => ({
      flowSlice: {
        ...state.flowSlice,
        flow: mockFlowStructure,
      },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("hides start/stop buttons if the status is disabled", () => {
    const props: FlowControlProps = {
      className: "",
      status: 0,
    };

    render(<FlowControl {...props} />);

    const startBtn = screen.queryByText(/START/);
    const stopBtn = screen.queryByText(/STOP/);

    expect(startBtn).not.toBeInTheDocument();
    expect(stopBtn).not.toBeInTheDocument();
  });
  it("shows start/stop buttons if the status is enabled", () => {
    const props: FlowControlProps = {
      className: "",
      status: 1,
    };

    render(<FlowControl {...props} />);

    const startBtn = screen.queryByText(/START/);
    const stopBtn = screen.queryByText(/STOP/);

    expect(startBtn).toBeInTheDocument();
    expect(stopBtn).toBeInTheDocument();
  });

  it("enables flow on status change", async () => {
    const props: FlowControlProps = {
      className: "",
      status: 1,
    };

    render(<FlowControl {...props} />);
    const enableSelect = screen.getByTestId(
      "test_select_change_flow_status"
    ) as HTMLSelectElement;

    await act(async () => {
      await fireEvent.change(enableSelect, { target: { value: "1" } });
    });

    await waitFor(() => {
      expect(enableSelect.value).toBe("1");
      expect(mockedAxios).toHaveBeenCalledTimes(1);
    });
  });
});
