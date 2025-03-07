import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { describe, test, vi } from "vitest";
import Footer from "./Footer";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("Footer component", () => {
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
    render(<Footer />);
    const year = new Date().getFullYear();
    const copyright = screen.getByText(
      `© ${year} Price Prowler. Todos los derechos reservados.`
    );
    const termOfUse = screen.getByText(
      "Términos de uso | Política de privacidad"
    );

    const developer = screen.getByText("Desarrollado por Victor Carancio");

    expect(copyright).toBeInTheDocument();
    expect(termOfUse).toBeInTheDocument();
    expect(developer).toBeInTheDocument();
  });

  test("Should reedirect to term of use", async () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const termOfUse = screen.getByText(
      /Términos de uso | Política de privacidad/i
    );
    await user.click(termOfUse);

    expect(mockNavigate).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/term-of-use");
  });
});
