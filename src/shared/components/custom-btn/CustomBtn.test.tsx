import { render, screen } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import CustomBtn from "./CustomBtn";
import userEvent, { UserEvent } from "@testing-library/user-event";

describe("CustomBtn test", () => {
  const mockOnClick = vi.fn();
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Should render with text and click should submit", async () => {
    render(
      <CustomBtn text="Test button" aria="test-button" onClick={mockOnClick} />
    );

    const textButton = screen.getByText("Test button");
    const button = screen.getByTestId("test-button");

    expect(textButton).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    await user.click(button);

    expect(mockOnClick).toBeCalled();
    expect(mockOnClick).toBeCalledTimes(1);
  });
});
