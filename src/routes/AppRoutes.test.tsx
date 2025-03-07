import { render, screen } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import {
  useGetFeaturedGamesQuery,
  useGetGameDetailQuery,
  useGetGameWithFiltersQuery,
} from "../store/apis/gameApi";
import { detailMockGame, mockGames } from "../testUtils";
import { HelmetProvider } from "react-helmet-async";
import { useGetGame } from "../features/search/hooks/useGetGame";

vi.mock("../store/apis/gameApi.ts", () => ({
  useGetFeaturedGamesQuery: vi.fn(),
  useGetGameDetailQuery: vi.fn(),
  useGetGameWithFiltersQuery: vi.fn(),
}));
vi.mock("../features/search/hooks/useGetGame.ts", () => ({
  useGetGame: vi.fn(),
}));

const mockDefault = {
  data: null,
  isLoading: false,
  error: false,
  refetch: vi.fn(),
};

describe("AppRoutes", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("render Home page on default route", () => {
    const mockFeatureGames = [
      { feature: "Test feature games", games: [...mockGames] },
    ];
    vi.mocked(useGetFeaturedGamesQuery).mockReturnValue({
      ...mockDefault,
      data: mockFeatureGames,
    });
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/"]}>
          <AppRoutes />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(screen.getByText("Test feature games")).toBeInTheDocument();
  });

  test("renders GameDetail page when navigating to /game/:id", () => {
    const mockGameDetail = { ...detailMockGame };

    vi.mocked(useGetGameDetailQuery).mockReturnValue({
      ...mockDefault,
      data: mockGameDetail,
    });

    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/game/123"]}>
          <AppRoutes />
        </MemoryRouter>
      </HelmetProvider>
    );

    const title = screen.getByText("Lies of P");
    const aboutGame = screen.getByText("Lies of P");
    const infoOfGame = screen.getByText("Lies of P");
    const description = screen.getByText("Lies of P");

    expect(title).toBeInTheDocument();
    expect(aboutGame).toBeInTheDocument();
    expect(infoOfGame).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  test("render result page when navigating to /results", () => {
    const data = { nbHts: 2, data: [...mockGames] };
    vi.mocked(useGetGame).mockReturnValue({
      ...mockDefault,
      data: data,
      error: undefined,
    });
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/results"]}>
          <AppRoutes />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(screen.getByText("Black Myth: Wukong")).toBeInTheDocument();
  });

  test("render result page when navigating to /filters-results", () => {
    const data = {
      nbHts: 2,
      totalGames: 60,
      totalPages: 3,
      currentPage: 1,
      games: [...mockGames],
    };
    vi.mocked(useGetGameWithFiltersQuery).mockReturnValue({
      ...mockDefault,
      data: data,
    });
    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/filters-results"]}>
          <AppRoutes />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(screen.getByText("Black Myth: Wukong")).toBeInTheDocument();
  });

  test("render not found page when navigating to /term-of-use", () => {
    render(
      <MemoryRouter initialEntries={["/term-of-use"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText("Política de Privacidad")).toBeInTheDocument();
    expect(screen.getByText("Términos de Uso")).toBeInTheDocument();
  });

  test("render not found page on unknkown route", () => {
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText("404 Not Found")).toBeInTheDocument();
  });
});
