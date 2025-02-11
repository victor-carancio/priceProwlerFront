import { render, screen } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import ResultNotFound from "./ResultNotFound";
// import { StyledIcon } from "../logo/logo";
// import { FaFaceFrown } from "react-icons/fa6";

describe("Result not found component", () => {
  vi.mock("react-icons/fa6", () => ({
    FaFaceFrown: vi.fn(() => (
      <svg aria-label="face-frown-icon" height="100px" width="100px" />
    )),
  }));
  afterEach(() => {
    vi.resetAllMocks();
  });
  test("Should render the component correctly with h2 message", () => {
    render(<ResultNotFound />);

    expect(
      screen.getByText(
        /No se han encontrado resultados, intenta otra búsqueda/i
      )
    ).toBeInTheDocument();
  });
  test("Should render icon with correct size", () => {
    render(<ResultNotFound />);

    const iconElement = screen.getByLabelText("face-frown-icon");
    expect(iconElement).toBeInTheDocument();

    expect(iconElement).toHaveAttribute("width", "100px");
    expect(iconElement).toHaveAttribute("height", "100px");
  });
});

// describe("Result not found component - Integration test", () => {
//   test("Should render StyledIcon component with correct size", () => {
//     const { container } = render(<ResultNotFound />);
//     logRoles(container);
//     const iconElement = screen.getByLabelText("face-frown-icon");
//     expect(iconElement).toBeInTheDocument();
//     expect(iconElement).toHaveAttribute("width", "100px");
//     expect(iconElement).toHaveAttribute("height", "100px");
//   });
// });
