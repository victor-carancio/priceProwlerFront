import { render, screen } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { describe, vi, expect } from "vitest";
import Pagination from "./Pagination";

describe("Pagination component test", () => {
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Should render pagination buttons correctly", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={3}
        prevPage={() => {}}
        nextPage={() => {}}
        clickPage={() => {}}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByTestId("next-icon")).toBeInTheDocument();
    expect(screen.getByTestId("prev-icon")).toBeInTheDocument();
  });

  test("Should call prevPage when click prev button", async () => {
    const prevButtonMock = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalPages={3}
        prevPage={prevButtonMock}
        nextPage={() => {}}
        clickPage={() => {}}
      />
    );
    const prevButton = screen.getByTestId("prev-icon");

    await user.click(prevButton);
    expect(prevButtonMock).toBeCalled();
  });
  test("Should call nextPage when click next button", async () => {
    const nextButtonMock = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalPages={3}
        prevPage={() => {}}
        nextPage={nextButtonMock}
        clickPage={() => {}}
      />
    );
    const prevButton = screen.getByTestId("next-icon");

    await user.click(prevButton);
    expect(nextButtonMock).toBeCalled();
  });
  test("Should call nextPage when click next button", async () => {
    const pageButtonMock = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalPages={3}
        prevPage={() => {}}
        nextPage={() => {}}
        clickPage={pageButtonMock}
      />
    );

    const pageButton = screen.getByText("1");

    await user.click(pageButton);

    expect(pageButtonMock).toBeCalled();
  });
});
