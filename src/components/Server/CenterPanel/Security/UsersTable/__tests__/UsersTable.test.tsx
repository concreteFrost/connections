import UsersTable from "../UsersTable";
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
import axios from "axios";
import userEvent from "@testing-library/user-event";
import { baseUrl } from "store/constants/baseUrl";
import { mockedUsers } from "__mocks__/mockUsersList";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

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

    expect(screen.getByText('Ilia Morozov')).toBeInTheDocument();
  });

  it("calling user list once per render",()=>{
    
  })
});
