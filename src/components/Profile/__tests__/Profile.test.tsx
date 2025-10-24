import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Profile from "components/Profile/Profile";
import { IconVariants } from "shared/enums/enums";

describe("Profile modal window", () => {
  test("opens profile modal when button is clicked", () => {
    const props = {
      themeColor: IconVariants.Dark,
    };
    render(
      <MemoryRouter>
        <Profile {...props} />
      </MemoryRouter>
    );
    const profileButton = screen.getByTestId("profile-icon");
    fireEvent.click(profileButton);

    // Допустим, после клика появляется модальное окно с определенным текстом
    const modalText = screen.getByText(/Name/i);
    expect(modalText).toBeInTheDocument();
  });
});
