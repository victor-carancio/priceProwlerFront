import { render, screen } from "@testing-library/react";
import { describe, test, vi } from "vitest";
import CustomSelect from "./CustomSelect";
import userEvent, { UserEvent } from "@testing-library/user-event";

const genres = [
  { label: "Acción", value: "Acción" },
  { label: "Aventura", value: "Aventura" },
  { label: "Acción y aventura", value: "Acción y aventura" },
  { label: "Carreras", value: "Carreras" },
  { label: "Simuladores", value: "Simuladores" },
  { label: "Deportes", value: "Deportes" },
  { label: "Acceso anticipado", value: "Acceso anticipado" },
  { label: "Rol", value: "Rol" },
];

describe("CustomSelect component", () => {
  const mockOnChange = vi.fn();
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  test("Should render component and options correctly", () => {
    render(
      <CustomSelect
        name="genre"
        options={genres}
        value=""
        onChange={mockOnChange}
      />
    );

    genres.forEach((genre) => {
      expect(screen.getByText(genre.label)).toBeInTheDocument();
    });
  });

  test("Shows placeholder if provided in props ", () => {
    const placeholder = "genre";
    render(
      <CustomSelect
        name="genre"
        options={genres}
        value=""
        onChange={mockOnChange}
        placeholder={placeholder}
      />
    );
    expect(screen.getByText(placeholder)).toBeInTheDocument();
  });

  test("Call onchange if an option is selected", async () => {
    // const [selectedValue, setSelectedValue] = useState("");
    render(
      <CustomSelect
        name="genre"
        options={genres}
        value=""
        onChange={mockOnChange}
      />
    );

    const select = screen.getByRole("combobox");
    await user.selectOptions(select, ["Rol"]);
    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
});
