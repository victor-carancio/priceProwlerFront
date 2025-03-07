import { render, screen } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import userEvent, { UserEvent } from "@testing-library/user-event";

import { MemoryRouter, useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const getElements = () => {
  const elements = {
    searchInput: screen.getByRole("textbox", {
      name: /buscar videojuego/i,
    }),
    searchLogo: screen.getByLabelText("search-icon"),
    filterLogo: screen.getByLabelText("filter-icon"),
  };
  return elements;
};

describe("SearchInput component", () => {
  const mockOnClick = vi.fn();
  const mockNavigate = vi.fn();

  let user: UserEvent;
  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    user = userEvent.setup();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Should render input and icons correctly", () => {
    render(<SearchInput onClick={mockOnClick} />);
    const { filterLogo, searchInput, searchLogo } = getElements();

    expect(searchInput).toBeInTheDocument();
    expect(searchLogo).toBeInTheDocument();
    expect(filterLogo).toBeInTheDocument();
  });

  test("Should be able to type in the input", async () => {
    render(<SearchInput onClick={mockOnClick} />);

    await user.type(getElements().searchInput, "resident evil");
    expect(getElements().searchInput).toBeInTheDocument();
    expect(getElements().searchInput).toHaveValue("resident evil");
  });

  test("navigates to the result page when input submitted with a non-empty input", async () => {
    render(
      <MemoryRouter>
        {" "}
        <SearchInput onClick={mockOnClick} />
      </MemoryRouter>
    );

    const { searchInput, searchLogo } = getElements();

    await user.type(searchInput, "resident evil");
    await user.click(searchLogo);

    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(
      "/results?search=resident%20evil"
    );
  });

  test("should not navigate when input value is empty", async () => {
    render(
      <MemoryRouter>
        {" "}
        <SearchInput onClick={mockOnClick} />
      </MemoryRouter>
    );

    const { searchLogo } = getElements();

    await user.click(searchLogo);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("should call onClick once click on filter logo", async () => {
    render(<SearchInput onClick={mockOnClick} />);

    const { searchInput, filterLogo } = getElements();

    await user.type(searchInput, "resident evil");
    await user.click(filterLogo);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
