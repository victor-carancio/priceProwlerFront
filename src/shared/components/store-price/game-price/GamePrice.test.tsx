import { render, screen } from "@testing-library/react";
import { describe, test } from "vitest";
import GamePrice from "./GamePrice";
// import GamePrice from "./GamePrice";

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
};
describe("GamePrice component - Unit Tests", () => {
  test('Should only render "-" as price, if final price equal to 0', () => {
    const mockStore = {
      ...mockBasePrice,
      info_price: { ...mockBasePrice.info_price, final_price: "0" },
    };
    render(<GamePrice store={mockStore} />);
    const { currency, discount_percent, final_price, initial_price } =
      mockStore.info_price;
    const currentPrice = screen.getByText("-");
    const initialPrice = screen.queryByText(`${initial_price} ${currency}`);
    const finalPrice = screen.queryByText(`${final_price} ${currency}`);
    const discount = screen.queryByText(`${discount_percent}%`);

    expect(currentPrice).toBeInTheDocument();
    expect(initialPrice).not.toBeInTheDocument();
    expect(finalPrice).not.toBeInTheDocument();
    expect(discount).not.toBeInTheDocument();
  });

  test("Should render initial price, final price and discount when percent is more than 0 or diferent than '-'", () => {
    render(<GamePrice store={mockBasePrice} />);

    const { currency, discount_percent, final_price, initial_price } =
      mockBasePrice.info_price;
    const initialPrice = screen.getByText(`${initial_price} ${currency}`);
    const finalPrice = screen.getByText(`${final_price} ${currency}`);
    const discount = screen.getByText(`${discount_percent}%`);

    expect(initialPrice).toBeInTheDocument();
    expect(finalPrice).toBeInTheDocument();
    expect(discount).toBeInTheDocument();
  });

  test("Should render only final price if discount is equals to or quals to '-'", () => {
    const mockStore = {
      ...mockBasePrice,
      info_price: {
        ...mockBasePrice.info_price,
        discount_percent: "0",
        final_price: "33200",
      },
    };
    render(<GamePrice store={mockStore} />);
    const { currency, discount_percent, final_price } = mockStore.info_price;

    const finalPrice = screen.getByText(`${final_price} ${currency}`);
    const discount = screen.queryByText(discount_percent);
    expect(finalPrice).toBeInTheDocument();
    expect(discount).not.toBeInTheDocument();
  });

  test("Should render only final price if discount is equals to or quals to '-'", () => {
    const mockStore = {
      ...mockBasePrice,
      info_price: {
        ...mockBasePrice.info_price,
        discount_percent: "0",
        final_price: "33200",
      },
    };
    render(<GamePrice store={mockStore} />);
    const { currency, discount_percent, final_price } = mockStore.info_price;

    const finalPrice = screen.getByText(`${final_price} ${currency}`);
    const discount = screen.queryByText(discount_percent);
    expect(finalPrice).toBeInTheDocument();
    expect(discount).not.toBeInTheDocument();
  });

  test("Should render only text if final price is equals to Próximamente", () => {
    const mockStore = {
      ...mockBasePrice,
      info_price: {
        ...mockBasePrice.info_price,
        final_price: "Próximamente",
        discount_percent: "-",
        initial_price: "Próximamente",
      },
    };
    render(<GamePrice store={mockStore} />);
    const { discount_percent, final_price } = mockStore.info_price;

    const finalPrice = screen.getByText(`${final_price}`);

    const discount = screen.queryByText(discount_percent);
    expect(finalPrice).toBeInTheDocument();
    expect(discount).not.toBeInTheDocument();
  });
});
