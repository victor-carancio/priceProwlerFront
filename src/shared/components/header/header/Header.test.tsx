import { test, describe, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, useNavigate } from "react-router-dom";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "../../../../store/slices/uiSlice";
import Header from "./Header";
import {
  useGetCategoriesQuery,
  useGetGenresQuery,
} from "../../../../store/apis/gameApi";

vi.mock("../../../../store/apis/gameApi.ts", () => ({
  useGetCategoriesQuery: vi.fn(),
  useGetGenresQuery: vi.fn(),
}));
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mockStore = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
});

const categoriesMock = {
  data: {
    categories: ["Multiplayer", "Cooperativo", "Un jugador"],
  },
  isLoading: false,
};
const genresMock = {
  data: {
    genres: ["Rol", "Acción", "RPG"],
  },
  isLoading: false,
};

describe("header component", () => {
  let user: UserEvent;

  const renderComponent = () =>
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
  beforeEach(() => {
    user = userEvent.setup();
    vi.mocked(useGetGenresQuery).mockReturnValue({
      ...genresMock,
      isLoading: false,
      refetch: vi.fn(),
    });
    vi.mocked(useGetCategoriesQuery).mockReturnValue({
      ...categoriesMock,
      isLoading: false,
      refetch: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("render input, search icon and filter icon", () => {
    renderComponent();

    const searchInput = screen.getAllByLabelText(/buscar videojuego/i);
    const searchLogo = screen.getAllByLabelText("search-icon");
    const filterLogo = screen.getAllByLabelText("filter-icon");

    const elementList = [...searchInput, ...searchLogo, ...filterLogo];

    elementList.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  test("render logo and navigate to home on click", async () => {
    const mockNavigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    renderComponent();

    const logo = screen.getByRole("img", { name: "pp-logo.png" });

    expect(logo).toBeInTheDocument();

    await user.click(logo);

    expect(mockNavigate).toBeCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("render theme logo and switch on click", async () => {
    renderComponent();

    const moonIcon = screen.queryByTestId("moon-icon");
    const sunIcon = screen.queryByTestId("sun-icon");

    expect(moonIcon).toBeInTheDocument();
    expect(sunIcon).not.toBeInTheDocument();

    await user.click(moonIcon!);

    expect(moonIcon).not.toBeInTheDocument();

    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
  });
});
