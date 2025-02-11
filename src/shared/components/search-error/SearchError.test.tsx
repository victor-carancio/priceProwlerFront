import { render, screen } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import SearchError from "./SearchError";

vi.mock("react-icons/fa6", () => ({
  FaFaceGrinBeamSweat: vi.fn(() => (
    <svg aria-label="face-grin-icon" height="100px" width="100px" />
  )),
}));
afterEach(() => {
  vi.resetAllMocks();
});
describe("SearchError component - Unit test", () => {
  test("Should render the component correctly with h2 message", () => {
    render(<SearchError />);

    expect(
      screen.getByText(
        /ocurrio un error inesperado, vuelva a intentarlo más tarde./i
      )
    ).toBeInTheDocument();
  });
  test("Should render icon with correct size", () => {
    render(<SearchError />);

    const iconElement = screen.getByLabelText("face-grin-icon");
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute("width", "100px");
    expect(iconElement).toHaveAttribute("height", "100px");
  });
});
