import { render, screen } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import AdvanceResults from "./AdvanceResults.page";
import { mockGames } from "../../testUtils";
import { useGetGameWithFiltersQuery } from "../../store/apis/gameApi";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

const data = {
  nbHts: 2,
  totalGames: 60,
  totalPages: 3,
  currentPage: 1,
  games: [...mockGames],
};

const mockedFilters = {
  data,
  error: false,
  isLoading: false,
  refetch: vi.fn(),
};

vi.mock("../../store/apis/gameApi.ts", () => ({
  useGetGameWithFiltersQuery: vi.fn(),
}));
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

const renderWithRouter = (component: React.ReactNode) => {
  return render(<MemoryRouter>{component}</MemoryRouter>);
};

describe("AdvanceResults page tests", () => {
  const mockSetSearchParams = vi.fn();
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();

    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams("genre=Aventura&sort=alphabetical&order=asc"),
      mockSetSearchParams,
    ]);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("Render loading component if data is fetching", () => {
    vi.mocked(useGetGameWithFiltersQuery).mockReturnValue({
      ...mockedFilters,
      isLoading: true,
    });

    renderWithRouter(<AdvanceResults />);

    expect(
      screen.getByText("Esto puede tomar unos momentos...")
    ).toBeInTheDocument();
  });
  test("Render error component if there was an error", () => {
    vi.mocked(useGetGameWithFiltersQuery).mockReturnValue({
      ...mockedFilters,
      error: true,
    });

    renderWithRouter(<AdvanceResults />);

    expect(
      screen.getByText(
        "Ocurrio un error inesperado, vuelva a intentarlo más tarde."
      )
    ).toBeInTheDocument();
  });

  test("Render games if data fetch correctly", () => {
    vi.mocked(useGetGameWithFiltersQuery).mockReturnValue({
      ...mockedFilters,
    });

    renderWithRouter(
      <HelmetProvider>
        <AdvanceResults />
      </HelmetProvider>
    );
    const gameOne = screen.getByText("Baldur'S Gate 3");
    const gameTwo = screen.getByText("Black Myth: Wukong");
    expect(gameOne).toBeInTheDocument();
    expect(gameTwo).toBeInTheDocument();
  });
  test("Should render pagination buttons", () => {
    vi.mocked(useGetGameWithFiltersQuery).mockReturnValue({
      ...mockedFilters,
    });

    renderWithRouter(
      <HelmetProvider>
        <AdvanceResults />
      </HelmetProvider>
    );

    expect(screen.getByText("Mostrando 1 - 20 de 60")).toBeInTheDocument();
    expect(screen.getByTestId("next-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("prev-icon")).not.toBeInTheDocument();
  });

  test("on click pagination button, must change params", async () => {
    vi.mocked(useGetGameWithFiltersQuery).mockReturnValue({
      ...mockedFilters,
    });

    render(
      <HelmetProvider>
        <MemoryRouter>
          <AdvanceResults />
        </MemoryRouter>
      </HelmetProvider>
    );

    const nextButton = screen.getByTestId("next-icon");

    await user.click(nextButton);
    expect(mockSetSearchParams).toHaveBeenCalled();

    expect(mockSetSearchParams.mock.calls[0][0]).toBeInstanceOf(Function);
    const newSearchParams = mockSetSearchParams.mock.calls[0][0](
      new URLSearchParams("genre=Aventura&sort=alphabetical&order=asc&page=1")
    );
    expect(newSearchParams.toString()).toBe(
      "genre=Aventura&sort=alphabetical&order=asc&page=2"
    );
  });
});
