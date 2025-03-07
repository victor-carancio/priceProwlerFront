import { render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { describe, test, vi } from "vitest";
import { mockGames } from "../../../../testUtils";
import userEvent, { UserEvent } from "@testing-library/user-event";
import FeatureGames from "./FeatureGames";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mockFeatureGames = {
  feature: "Test feature games",
  games: [...mockGames],
};

describe("FeatureGames component", () => {
  const mockNavigate = vi.fn();
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("render Games and feature sections", () => {
    render(
      <FeatureGames
        feature={mockFeatureGames.feature}
        games={mockFeatureGames.games}
      />
    );

    const featureTitle = screen.getByText(mockFeatureGames.feature);
    const gameOne = screen.getByText("Baldur'S Gate 3");
    const gameTwo = screen.getByText("Black Myth: Wukong");

    expect(featureTitle).toBeInTheDocument();
    expect(gameOne).toBeInTheDocument();
    expect(gameTwo).toBeInTheDocument();
  });

  test("if click on game card, should reedirect to game detail", async () => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    render(
      <MemoryRouter>
        <FeatureGames
          feature={mockFeatureGames.feature}
          games={mockFeatureGames.games}
        />
      </MemoryRouter>
    );
    const gameOne = screen.getByText("Baldur'S Gate 3");

    await user.click(gameOne);

    expect(mockNavigate).toBeCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/game/25");
  });
  test("if click on game card, should reedirect to game detail", async () => {
    render(
      <FeatureGames
        feature={mockFeatureGames.feature}
        games={Array(12).fill(mockFeatureGames.games[0])}
      />
    );
    const toggleButton = screen.getByText("Ver Más");

    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveTextContent("Ver Más");

    await user.click(toggleButton);

    expect(toggleButton).toHaveTextContent("Ver Menos");

    await user.click(toggleButton);

    expect(toggleButton).toHaveTextContent("Ver Más");
  });
});
