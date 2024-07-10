import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FlowsItem from "../FlowsItem";
import { ILeftPanelSections } from "../../LeftPanel";
import useStore from "store/store";
import { RFState } from "store/types/rfState";
import { BrowserRouter } from "react-router-dom";

const props = {
  toggleSection: jest.fn(),
  navigate: jest.fn(),
  currentSection: { flows: true } as ILeftPanelSections,
};

// Props for the component

describe("FlowsItem Component", () => {
  // Reset store before each test
  beforeEach(() => {
    //mocking data for statistics
    useStore.setState((state: RFState) => ({
      statisticsSlice: {
        ...state.statisticsSlice,
        statistics: [
          {
            flowId: "1234",
            name: "test flow",
            version: "",
            createdBy: "",
            dateCreated: "",
            lastUpdateBy: "",
            lastUpdated: null,
            startBlock: "",
            status: 0,
            enabled: false,
            statistics: [],
          },
        ],
      },
    }));
  });

  it("renders live flow list component", () => {
    render(
      <BrowserRouter>
        <FlowsItem {...props} />
      </BrowserRouter>
    );

    expect(screen.getByRole("list")).toBeInTheDocument();
  });

  it("renders data from store", () => {
    render(
      <BrowserRouter>
        <FlowsItem {...props} />
      </BrowserRouter>
    );

    expect(screen.getByText(/test flow/)).toBeInTheDocument();
  });

  it("skips list render if no data was received",()=>{

    //its important to set store before component was rendered
    useStore.setState((state: RFState) => ({
      statisticsSlice: {
        ...state.statisticsSlice,
        statistics: [
          
        ],
      },
    }));

    render(
      <BrowserRouter>
        <FlowsItem {...props} />
      </BrowserRouter>
    );

    expect(screen.queryByRole('list')).toBeNull();
  
  })

  it("calling createUpdateDraftFromLiveTemplate() ",() => {
    render(
      <BrowserRouter>
        <FlowsItem {...props} />
      </BrowserRouter>
    );

    const button = screen.getByTestId("flow-list-btn");

    fireEvent.click(button);

    //check if createUpdateDraftFromLiveTemplate have been called
    waitFor(() => expect(useStore.setState).toHaveBeenCalledTimes(1));
  });
});
