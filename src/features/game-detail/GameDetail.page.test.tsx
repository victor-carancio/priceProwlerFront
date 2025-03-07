import { render, screen } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import GameDetail from "./GameDetail.page";
import { detailMockGame } from "../../testUtils";

import { useGetGameDetailQuery } from "../../store/apis/gameApi";
import { HelmetProvider } from "react-helmet-async";

vi.mock("../../store/apis/gameApi.ts", () => ({
  useGetGameDetailQuery: vi.fn(),
}));

const mockGameDetail = {
  data: { ...detailMockGame },
  error: false,
  isLoading: false,
  refetch: vi.fn(),
};

describe("GameDetail page test", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("If data isLoading should render is loading component", () => {
    vi.mocked(useGetGameDetailQuery).mockReturnValue({
      ...mockGameDetail,
      isLoading: true,
    });

    render(<GameDetail />);
    expect(
      screen.getByText("Esto puede tomar unos momentos...")
    ).toBeInTheDocument();
  });
  test("Render error component if there was an error", () => {
    vi.mocked(useGetGameDetailQuery).mockReturnValue({
      ...mockGameDetail,
      error: true,
    });

    render(<GameDetail />);
    expect(
      screen.getByText(
        "Ocurrio un error inesperado, vuelva a intentarlo más tarde."
      )
    ).toBeInTheDocument();
  });

  test("Render game detail and feature sections if data fetch correctly", () => {
    vi.mocked(useGetGameDetailQuery).mockReturnValue({
      ...mockGameDetail,
    });

    render(
      <HelmetProvider>
        <GameDetail />
      </HelmetProvider>
    );

    const title = screen.getByText("Lies of P");
    const aboutGame = screen.getByText("Lies of P");
    const infoOfGame = screen.getByText("Lies of P");
    const description = screen.getByText("Lies of P");
    const systemRequirements = screen.getByText("Lies of P");
    const galleryMobile = screen.getByLabelText("mobile-gallery");
    const galleryTablet = screen.getByLabelText("tablet-gallery");
    const prices = screen.getByLabelText("Steam-price");

    expect(title).toBeInTheDocument();
    expect(aboutGame).toBeInTheDocument();
    expect(infoOfGame).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(systemRequirements).toBeInTheDocument();
    expect(prices).toBeInTheDocument();
    expect(galleryTablet).toBeInTheDocument();
    expect(galleryMobile).toBeInTheDocument();
  });

  test("anchor elements must have correct links and attributes", async () => {
    vi.mocked(useGetGameDetailQuery).mockReturnValue({
      ...mockGameDetail,
    });

    render(
      <HelmetProvider>
        <GameDetail />
      </HelmetProvider>
    );

    const price = screen.getByLabelText("Steam-price");
    const gamePage = screen.getByText("Sitio web");

    expect(price.firstChild).toHaveAttribute(
      "href",
      mockGameDetail.data.stores[0].url
    );
    expect(price.firstChild).toHaveAttribute("target", "_blank");
    expect(price.firstChild).toHaveAttribute("rel", "noopener noreferrer");
    expect(gamePage).toHaveAttribute(
      "href",
      mockGameDetail.data.stores[0].info_game.website
    );
    expect(gamePage).toHaveAttribute("target", "_blank");
    expect(gamePage).toHaveAttribute("rel", "noopener noreferrer");
  });
});
