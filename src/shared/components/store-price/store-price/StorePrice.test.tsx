import { render, screen } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import StorePrice from "./StorePrice";

const mockBasePrice = {
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
  store: "Steam",
  gamepass: null,
  url: "https://store.steampowered.com/app/3010850/Gears_of_War:_E-Day/",
};

vi.mock("react-icons/fa", () => ({
  FaSteam: () => <svg aria-label="steam-icon" />,
  FaXbox: () => <svg aria-label="xbox-icon" />,
}));

vi.mock("react-icons/si", () => ({
  SiEpicgames: () => <svg aria-label="epic-icon" />,
}));

vi.mock("/GamepassIcon", () => ({
  GamepassIcon: () => <svg aria-label="gamepass-icon" />,
}));

describe("StorePrice component - Unit test", () => {
  test("Should render component with store equals to steam correctly", () => {
    render(<StorePrice store={mockBasePrice} shouldRedirect={false} />);
    const storeIcon = screen.getByLabelText("steam-icon");
    const gamepassIcon = screen.queryByLabelText("gamepass-icon");

    expect(storeIcon).toBeInTheDocument();
    expect(gamepassIcon).not.toBeInTheDocument();
  });

  test("Should render component with store equals to xbox correctly", () => {
    const mockStore = {
      ...mockBasePrice,
      store: "Xbox",
      gamepass: true,
    };
    render(<StorePrice store={mockStore} shouldRedirect={false} />);
    const storeIcon = screen.getByLabelText("xbox-icon");
    const gamepassIcon = screen.queryByLabelText("gamepass-icon");
    expect(storeIcon).toBeInTheDocument();
    expect(gamepassIcon).toBeInTheDocument();
  });

  test("Should render as <div> when shouldRedirect equals to false", () => {
    const mockStore = {
      ...mockBasePrice,
      store: "Xbox",
      gamepass: true,
    };
    render(<StorePrice store={mockStore} shouldRedirect={false} />);

    const storeElement = screen.getByTestId("store-price");

    expect(storeElement).toBeInTheDocument();
    expect(storeElement.tagName).toBe("DIV");
  });

  test("Should render as <a> with correct attributes when shouldRedirect equals to true", () => {
    const mockStore = {
      ...mockBasePrice,
      store: "Xbox",
      gamepass: true,
    };
    render(<StorePrice store={mockStore} shouldRedirect={true} />);

    const storeElement = screen.getByRole("link");

    expect(storeElement).toBeInTheDocument();
    expect(storeElement.tagName).toBe("A");
    expect(storeElement).toHaveAttribute("href", mockStore.url);
    expect(storeElement).toHaveAttribute("target", "_blank");
    expect(storeElement).toHaveAttribute("rel", "noopener noreferrer");
  });
});
