import UsersTable from "../UsersTable";
import { render, screen, waitFor, act } from "@testing-library/react";
import useStore from "store/store";
import { RFState } from "shared/types/rfState";
import userEvent from "@testing-library/user-event";
import { mockedUsers } from "__mocks__/mockUsersList";

describe("UserTable component", () => {
  beforeEach(() => {
    useStore.setState((state: RFState) => ({
      securitySlice: {
        ...state.securitySlice,
        userList: mockedUsers,
      },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders users list", () => {
    render(<UsersTable />);

    expect(screen.getByText("Ilia Morozov")).toBeInTheDocument();
  });

  it("renders EDIT USER modal window on EDIT btn click", async () => {
    render(<UsersTable />);

    const editBtn = screen.queryByTestId(
      "test_Ilia Morozov_btn"
    ) as HTMLButtonElement;

    expect(editBtn).toBeInTheDocument();

    await act(async () => {
      userEvent.click(editBtn);
    });

    await waitFor(() => {
      expect(screen.getByText("RESET PASSWORD")).toBeInTheDocument();
    });
  });

  it("renders Add User modal window on ADD USER btn click", async () => {
    render(<UsersTable />);

    const addUserBtn = screen.queryByTestId(
      "test_add_user_btn"
    ) as HTMLButtonElement;

    expect(addUserBtn).toBeInTheDocument();

    await act(async () => {
      userEvent.click(addUserBtn);
    });

    await waitFor(() => {
      expect(screen.getByText("GENERATE")).toBeInTheDocument();
    });
  });
});
