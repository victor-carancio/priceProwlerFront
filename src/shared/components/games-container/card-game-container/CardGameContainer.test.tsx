import { render, screen } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import CardGameContainer from "./CardGameContainer";
import { MemoryRouter, useNavigate } from "react-router-dom";
import userEvent, { UserEvent } from "@testing-library/user-event";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mockGame = {
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
};

describe("CardGameContainer", () => {
  const mockNavigate = vi.fn();
  let user: UserEvent;
  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    user = userEvent.setup();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Should render correctly", () => {
    render(<CardGameContainer game={mockGame} />);

    const img = screen.getByRole("img", { name: `${mockGame.gameName}-img` });
    const gameName = screen.getByText(/baldur's gate 3/i);
    const initialPrice = screen.getByText(/33200/i);
    const finalPrice = screen.getByText(/16600/i);
    const discount = screen.getByText(/50/i);

    expect(img).toBeInTheDocument();
    expect(gameName).toBeInTheDocument();
    expect(initialPrice).toBeInTheDocument();
    expect(finalPrice).toBeInTheDocument();
    expect(discount).toBeInTheDocument();
  });

  test("Should navigates to the result page when click on card", async () => {
    render(
      <MemoryRouter>
        <CardGameContainer game={mockGame} />
      </MemoryRouter>
    );
    const img = screen.getByRole("img", { name: `${mockGame.gameName}-img` });
    await user.click(img);
    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(`/game/${mockGame.id}`);
  });
});
