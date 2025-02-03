import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Loading from "../../shared/components/loading/Loading";

describe("testing test config", () => {
  test("renders correctyly", () => {
    render(<Loading />);
    screen.debug();
    const selectElement = screen.getByText(
      /Esto puede tomar unos momentos.../i
    );
    expect(selectElement).toBeInTheDocument();
  });
});
