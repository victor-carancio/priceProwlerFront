import { render, screen } from "@testing-library/react";
import { describe, test } from "vitest";
import Loading from "./Loading";

describe("Loading component", () => {
  test("Should render the component with correct message", () => {
    render(<Loading />);
    expect(
      screen.getByText("Esto puede tomar unos momentos...")
    ).toBeInTheDocument();
  });

  test("Should have img element", () => {
    render(<Loading />);

    const img = screen.getByRole("img", { name: "loading-img" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "/assets/Bean-Eater-loader.gif");
  });
});
