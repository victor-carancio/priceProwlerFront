import { render, screen } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { useGetGame } from "./hooks/useGetGame";
import Results from "./Results.page";
import { mockGames } from "../../testUtils";
import { HelmetProvider } from "react-helmet-async";
import userEvent, { UserEvent } from "@testing-library/user-event";

vi.mock("./hooks/useGetGame.ts", () => ({
  useGetGame: vi.fn(),
}));

const data = { nbHts: 2, data: [...mockGames] };

const mockedUseGetGame = {
  data: { ...data },
  error: undefined,
  isLoading: false,
  refetch: vi.fn(),
};

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Results Page", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("Render loading component if data is fetching", () => {
    vi.mocked(useGetGame).mockReturnValue({
      ...mockedUseGetGame,
      isLoading: true,
    });

    renderWithRouter(<Results />);
    expect(
      screen.getByText("Esto puede tomar unos momentos...")
    ).toBeInTheDocument();
  });

  test("Render error component if there was an error", () => {
    vi.mocked(useGetGame).mockReturnValue({
      ...mockedUseGetGame,
      error: { status: 500, data: { message: "Server error" } },
    });

    renderWithRouter(<Results />);
    expect(
      screen.getByText(
        "Ocurrio un error inesperado, vuelva a intentarlo más tarde."
      )
    ).toBeInTheDocument();
  });

  test("Render games if data fetch correctly", () => {
    vi.mocked(useGetGame).mockReturnValue({
      ...mockedUseGetGame,
    });

    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[`results?search=resident%20evil`]}>
          <Results />
        </MemoryRouter>
      </HelmetProvider>
    );

    const gameOne = screen.getByText("Baldur'S Gate 3");
    const gameTwo = screen.getByText("Black Myth: Wukong");
    expect(gameOne).toBeInTheDocument();
    expect(gameTwo).toBeInTheDocument();
  });

  test("Render combobox filters correctly", async () => {
    vi.mocked(useGetGame).mockReturnValue({
      ...mockedUseGetGame,
    });

    render(
      <HelmetProvider>
        <MemoryRouter initialEntries={[`results?search=resident%20evil`]}>
          <Results />
        </MemoryRouter>
      </HelmetProvider>
    );

    const select = screen.getByRole("combobox");

    await user.selectOptions(select, ["alphabetical-desc"]);

    expect(select).toHaveValue("alphabetical-desc");
  });
});
