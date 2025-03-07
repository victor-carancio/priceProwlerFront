import { render, screen } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import { BrowserRouter, useNavigate } from "react-router-dom";
import AdvanceSearch from "./AdvanceSearch";
import userEvent, { UserEvent } from "@testing-library/user-event";
import {
  useGetCategoriesQuery,
  useGetGenresQuery,
} from "../../../../store/apis/gameApi";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock("../../../../store/apis/gameApi.ts", () => ({
  useGetCategoriesQuery: vi.fn(),
  useGetGenresQuery: vi.fn(),
}));

const categoriesMock = {
  data: {
    categories: ["Multiplayer", "Cooperativo", "Un jugador"],
  },
  isLoading: false,
  refetch: vi.fn(),
};
const genresMock = {
  data: {
    genres: ["Rol", "Acción", "RPG"],
  },
  isLoading: false,
  refetch: vi.fn(),
};

describe("AdvanceSearch component", () => {
  const mockNavigate = vi.fn();
  const mockAdvanceToggle = vi.fn();
  let user: UserEvent;
  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    user = userEvent.setup();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Shows 'cargando...' if category or genre are loading", () => {
    vi.mocked(useGetGenresQuery).mockReturnValue({
      ...genresMock,
      isLoading: true,
    });
    vi.mocked(useGetCategoriesQuery).mockReturnValue({
      ...categoriesMock,
      isLoading: true,
    });
    render(
      <AdvanceSearch
        openSearch={true}
        isAdvanceSearch={true}
        advanceSearchToggle={mockAdvanceToggle}
      />
    );
    expect(screen.getByText(/cargando.../i)).toBeInTheDocument();
  });

  test("Should render select options correctly once complete data loading", () => {
    vi.mocked(useGetGenresQuery).mockReturnValue(genresMock);
    vi.mocked(useGetCategoriesQuery).mockReturnValue(categoriesMock);
    render(
      <AdvanceSearch
        openSearch={true}
        isAdvanceSearch={true}
        advanceSearchToggle={mockAdvanceToggle}
      />
    );

    genresMock.data.genres.forEach((genre) => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });

    categoriesMock.data.categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  test("Should change filter option on select and submit when click botton search", async () => {
    vi.mocked(useGetCategoriesQuery).mockReturnValue(categoriesMock);
    vi.mocked(useGetGenresQuery).mockReturnValue(genresMock);
    render(
      <BrowserRouter>
        <AdvanceSearch
          openSearch={true}
          isAdvanceSearch={true}
          advanceSearchToggle={mockAdvanceToggle}
        />
      </BrowserRouter>
    );

    const genreSelect = screen.getByTestId("genre-select");
    const categorySelect = screen.getByTestId("category-select");

    const genreOption = "Rol";
    const categoryOption = "Multiplayer";

    await user.selectOptions(genreSelect, genreOption);
    await user.selectOptions(categorySelect, categoryOption);
    expect(genreSelect).toHaveValue(genreOption);
    expect(categorySelect).toHaveValue(categoryOption);
    const filterSearchButton = screen.getByTestId(/search-button/i);

    await user.click(filterSearchButton);
    expect(mockNavigate).toBeCalled();
    expect(mockNavigate).toHaveBeenCalledWith(
      `/filters-results?genre=${genreOption}&category=${categoryOption}`
    );
  });
});
