import FlowProperties from "../FlowProperties";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Flow Properties component", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("toggles isEnabled checkbox", async () => {
    render(<FlowProperties />); // Замените на ваш компонент

    const checkbox = screen.getByLabelText("IS ENABLED") as HTMLInputElement;

    expect(checkbox).toBeInTheDocument();

    expect(checkbox.checked).toBe(true);

    await act(async () => {
      userEvent.click(checkbox); // Имитируем клик на чекбоксе
    });

    // Дожидаемся изменений
    await waitFor(() => {
      expect(checkbox.checked).toBe(false); // Проверяем, что чекбокс теперь не отмечен
    });
  });

  it("changes flow name", async () => {
    render(<FlowProperties />);
    const input = screen.getByLabelText("flow_name") as HTMLInputElement;
    const newFlowName = "new flow 22"; // новое значение для имени

    await act(async () => {
      await userEvent.clear(input);
      await userEvent.type(input, newFlowName);
    });

    await waitFor(() => {
      expect(input.value).toBe(newFlowName);
    });
  });

  it("shows default flow version as 1.0.0.0", () => {
    render(<FlowProperties />);
    const input = screen.getByLabelText("flow_version") as HTMLInputElement;

    expect(input.value).toBe("1.0.0.0");
  });

  it("changes flow version", async () => {
    render(<FlowProperties />);
    const input = screen.getByLabelText("flow_version") as HTMLInputElement;

    await act(async () => {
      await userEvent.dblClick(input);

      await userEvent.type(input, "2");
    });

    await waitFor(() => {
      expect(input.value).toBe("1.0.0.02");
    });
  });
});
