import { render, screen } from "@testing-library/react";
import { describe, test } from "vitest";
import GamepassIcon from "./GamepassIcon";

describe("GamepassIcon component", () => {
  test("Should render component and attributes correctly", () => {
    render(<GamepassIcon height="40px" fill="#eee" />);
    const icon = screen.getByLabelText("gamepass-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("fill", "#eee");
    expect(icon).toHaveAttribute("height", "40px");
  });
});
