import { render, screen } from "@testing-library/react";
import { describe, test, vi } from "vitest";
// import GamesContainer from "../GamesContainer";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { MemoryRouter, useNavigate } from "react-router-dom";
import GamesContainer from "./GamesContainer";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mockGames = [
  {
    gameName: "Baldur's Gate 3",
    id: 25,
    stores: [
      {
        info_price: {
          createdAt: "2025-02-04T04:01:19.295Z",
          currency: "CLP",
          discount_percent: "50",
          final_price: "16600",
          id: 507,
          initial_price: "33200",
          offer_end_date: null,
          store_game_id: 507,
          updatedAt: "2025-02-06T04:01:17.042Z",
        },
        info_game: {
          imgStore:
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1142710/header.jpg?t=1734023395",
        },

        store: "Steam",
        gamepass: null,
        url: "https://store.steampowered.com/app/3010850/Gears_of_War:_E-Day/",
        game_id: 486,
        id: 648,
      },
    ],
    updatedAt: "2025-01-17T20:01:05.073Z",
  },
  {
    gameName: "Black Myth: Wukong",
    id: 26,
    stores: [
      {
        info_price: {
          createdAt: "2025-02-04T04:01:19.295Z",
          currency: "CLP",
          discount_percent: "10",
          final_price: "35999",
          id: 353,
          initial_price: "39999",
          offer_end_date: null,
          store_game_id: 353,
          updatedAt: "2025-02-06T04:01:17.042Z",
        },
        info_game: {
          imgStore:
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1142710/header.jpg?t=1734023395",
        },

        store: "Steam",
        gamepass: null,
        url: "https://store.steampowered.com/app/3010850/Gears_of_War:_E-Day/",
        game_id: 279,
        id: 353,
      },
    ],
    updatedAt: "2025-01-17T20:01:05.073Z",
  },
];

describe("GamesContainer", () => {
  const mockNavigate = vi.fn();
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  test("should render correctly", () => {
    render(<GamesContainer data={mockGames} />);

    const gameOne = screen.getByText(/Baldur's Gate 3/i);
    const gameTwo = screen.getByText(/Black Myth: Wukong/i);

    expect(gameOne).toBeInTheDocument();
    expect(gameTwo).toBeInTheDocument();
  });

  test("if click, Should reedirect correctly", async () => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    render(
      <MemoryRouter>
        <GamesContainer data={mockGames} />
      </MemoryRouter>
    );

    const gameOne = screen.getByText(/Baldur's Gate 3/i);

    await user.click(gameOne);

    expect(mockNavigate).toBeCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/game/25");
  });
});
