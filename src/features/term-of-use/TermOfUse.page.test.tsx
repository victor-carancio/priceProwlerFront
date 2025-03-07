import { render, screen } from "@testing-library/react";
import { describe, test } from "vitest";
import TermOfUse from "./TermOfUse.page";
import { MemoryRouter } from "react-router-dom";

describe("TermOfUse Page", () => {
  test("Should render titles os sections", () => {
    render(
      <MemoryRouter>
        <TermOfUse />
      </MemoryRouter>
    );

    expect(screen.getByText("Política de Privacidad")).toBeInTheDocument();
    expect(screen.getByText("Términos de Uso")).toBeInTheDocument();
  });

  test("Should render important sections", () => {
    render(
      <MemoryRouter>
        <TermOfUse />
      </MemoryRouter>
    );

    expect(screen.getByText("Información que recopilamos")).toBeInTheDocument();
    expect(screen.getByText("Uso de Local Storage")).toBeInTheDocument();
    expect(screen.getByText("Enlaces a terceros")).toBeInTheDocument();
    expect(screen.getByText("Cambios futuros")).toBeInTheDocument();
    expect(screen.getByText("Propósito del sitio")).toBeInTheDocument();
    expect(screen.getByText("Exactitud de los precios")).toBeInTheDocument();
    expect(screen.getByText("Redirección a tiendas")).toBeInTheDocument();
    expect(screen.getByText("Uso del contenido")).toBeInTheDocument();
    expect(screen.getByText("Responsabilidad limitada")).toBeInTheDocument();
    expect(screen.getByText("Cambios en los términos")).toBeInTheDocument();
  });
});
