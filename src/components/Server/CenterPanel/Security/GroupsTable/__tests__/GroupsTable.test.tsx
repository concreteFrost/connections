import GroupsTable from "../GroupsTable";
import { render, screen, waitFor, act } from "@testing-library/react";
import useStore from "store/store";
import { RFState } from "shared/types/rfState";
import userEvent from "@testing-library/user-event";
import { mockedGroupsList } from "__mocks__/mockGroupsList";

const toggleConfirmationModal = jest.spyOn(
  useStore.getState().modalWindowsSlice,
  "toggleConfirmationModal"
);

describe("UserTable component", () => {
  beforeEach(() => {
    useStore.setState((state: RFState) => ({
      securitySlice: {
        ...state.securitySlice,
        groupList: mockedGroupsList,
      },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders users list", () => {
    render(<GroupsTable />);

    expect(screen.getByText("AllNotificationsGroup")).toBeInTheDocument();
  });

  it("renders EDIT GROUP modal window on EDIT btn click", async () => {
    render(<GroupsTable />);

    const editBtn = screen.queryByTestId(
      "test_AllNotificationsGroup_btn"
    ) as HTMLButtonElement;

    expect(editBtn).toBeInTheDocument();

    await act(async () => {
      userEvent.click(editBtn);
    });

    await waitFor(() => {
      expect(
        screen.getByText("EDIT ALLNOTIFICATIONSGROUP")
      ).toBeInTheDocument();
    });
  });

  it("renders Add Group modal window on ADD GROUP btn click", async () => {
    render(<GroupsTable />);

    const addGroupBtn = screen.queryByTestId(
      "test_add_group_btn"
    ) as HTMLButtonElement;

    expect(addGroupBtn).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(addGroupBtn);
    });

    await waitFor(() => {
      expect(screen.getByText("Group Name:")).toBeInTheDocument();
    });
  });

  it("renders delete group confirmation window on X btn click", async () => {
    render(<GroupsTable />);

    const deleteGroupBtn = screen.queryByTestId(
      "test_delete_AllNotificationsGroup_btn"
    ) as HTMLButtonElement;

    expect(deleteGroupBtn).toBeInTheDocument();

    await act(async () => {
      userEvent.click(deleteGroupBtn);
    });

    await waitFor(() => {
      expect(toggleConfirmationModal).toHaveBeenCalledTimes(1);
    });
  });
});
