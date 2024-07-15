import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ILeftPanelSections } from "../../LeftPanel";
import DraftFlowsItem from "../DraftFlowsItem";
import { act } from "react-dom/test-utils";
import { mockedDraftFlows } from "__mocks__/mockDraftFlowsList";
import axios from "axios";
import userEvent from "@testing-library/user-event";

const props = {
  toggleSection: jest.fn(),
  navigate: jest.fn(),
  currentSection: { drafts: true } as ILeftPanelSections,
};

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("DraftFlowsItem component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders draft flow list component", () => {
    render(<DraftFlowsItem {...props} />);
    expect(screen.getByText(/DRAFTS/)).toBeInTheDocument();
  });

  it("calling draft list on header click", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockedDraftFlows });
    render(<DraftFlowsItem {...props} />);

    const header = screen.getByText(/DRAFTS/);

    await act(async () => {
      await fireEvent.click(header);
    });

    expect(screen.getByText("drafts")).toBeInTheDocument();
  });

  it("toggling draft section on section name click", async () => {
    mockedAxios.get.mockResolvedValue({ data: mockedDraftFlows });
    render(<DraftFlowsItem {...props} />);

    const header = screen.getByText(/DRAFTS/);

    await act(async () => {
      await userEvent.click(header);
    });

    const draftFolder = screen.getByTestId("test_drafts") as any;

    await act(async () => {
      await userEvent.click(draftFolder);
    });

    await waitFor(() => {
      expect(screen.getByText("Rich")).toBeInTheDocument();
    });

    await act(async () => {
      await userEvent.click(draftFolder);
    });

    await waitFor(() => {
      expect(screen.queryByText("Rich")).not.toBeInTheDocument();
    });
  });
});
