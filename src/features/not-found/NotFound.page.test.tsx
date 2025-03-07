import { render, screen } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import NotFound from "./NotFound.page";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { MemoryRouter, useNavigate } from "react-router-dom";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("NotFound page tests", () => {
  const mockNavigate = vi.fn();

  let user: UserEvent;

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    user = userEvent.setup();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  test("Should render page and components correctly", () => {
    render(<NotFound />);

    const title = screen.getByText("404 Not Found");
    const notExist = screen.getByText(
      /La página que estas buscando no existe/i
    );
    const button = screen.getByText("Volver al inicio");

    expect(title).toBeInTheDocument();
    expect(notExist).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("click button should redirect to home", async () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const button = screen.getByText("Volver al inicio");
    await user.click(button);

    expect(mockNavigate).toBeCalled();
    expect(mockNavigate).toHaveBeenCalledWith(`/`);
  });
});
