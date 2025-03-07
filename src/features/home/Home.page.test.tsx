import { render, screen } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import { useGetFeaturedGamesQuery } from "../../store/apis/gameApi";
import { mockGames } from "../../testUtils";
import Home from "./Home.page";
import { HelmetProvider } from "react-helmet-async";
import { MemoryRouter, useNavigate } from "react-router-dom";
import userEvent, { UserEvent } from "@testing-library/user-event";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});
vi.mock("../../store/apis/gameApi.ts", () => ({
  useGetFeaturedGamesQuery: vi.fn(),
}));
const mockFeatureGames = {
  data: [{ feature: "Test feature games", games: [...mockGames] }],
  error: false,
  isLoading: false,
  refetch: vi.fn(),
};

describe("Home page", () => {
  const mockNavigate = vi.fn();
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  test("if data isLoading should render is loading component", () => {
    vi.mocked(useGetFeaturedGamesQuery).mockReturnValue({
      ...mockFeatureGames,
      isLoading: true,
    });

    render(<Home />);
    expect(
      screen.getByText("Esto puede tomar unos momentos...")
    ).toBeInTheDocument();
  });

  test("Render error component if there was an error", () => {
    vi.mocked(useGetFeaturedGamesQuery).mockReturnValue({
      ...mockFeatureGames,
      error: true,
    });

    render(<Home />);
    expect(
      screen.getByText(
        "Ocurrio un error inesperado, vuelva a intentarlo más tarde."
      )
    ).toBeInTheDocument();
  });

  test("render Games and feature sections if data fetch correctly", () => {
    vi.mocked(useGetFeaturedGamesQuery).mockReturnValue({
      ...mockFeatureGames,
    });

    render(
      <HelmetProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </HelmetProvider>
    );

    const feature = screen.getByText("Test feature games");
    const gameOne = screen.getByText("Baldur'S Gate 3");
    const gameTwo = screen.getByText("Black Myth: Wukong");

    expect(feature).toBeInTheDocument();
    expect(gameOne).toBeInTheDocument();
    expect(gameTwo).toBeInTheDocument();
  });

  test("if click on game card, should reedirect to game detail", async () => {
    vi.mocked(useGetFeaturedGamesQuery).mockReturnValue({
      ...mockFeatureGames,
    });
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);

    render(
      <HelmetProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </HelmetProvider>
    );

    const gameOne = screen.getByText("Baldur'S Gate 3");

    await user.click(gameOne);

    expect(mockNavigate).toBeCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/game/25");
  });
});
