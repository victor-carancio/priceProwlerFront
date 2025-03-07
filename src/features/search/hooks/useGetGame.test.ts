import { renderHook } from "@testing-library/react";
import { useGetGame } from "./useGetGame";
import { vi } from "vitest";
import {
  useGetGameFromNameDBQuery,
  useGetGameFromScraperQuery,
} from "../../../store/apis/gameApi";
import { mockGames } from "../../../testUtils";

vi.mock("../../../store/apis/gameApi.ts", () => ({
  useGetGameFromNameDBQuery: vi.fn(),
  useGetGameFromScraperQuery: vi.fn(),
}));

const data = { nbHts: 2, data: [...mockGames] };
const mockedData = {
  data,
  error: false,
  isFetching: false,
  refetch: vi.fn(),
};

describe("useGetGame hook", () => {
  test("should retun loading state when data is fetching", () => {
    vi.mocked(useGetGameFromNameDBQuery).mockReturnValue({
      ...mockedData,
      isFetching: true,
    });

    vi.mocked(useGetGameFromScraperQuery).mockReturnValue({
      ...mockedData,
    });

    const { result } = renderHook(() => useGetGame("game-name"));
    expect(result.current.isLoading).toBe(true);
  });
  test("should return data from nameDb when is available", () => {
    vi.mocked(useGetGameFromNameDBQuery).mockReturnValue({
      ...mockedData,
    });

    vi.mocked(useGetGameFromScraperQuery).mockReturnValue({
      ...mockedData,
      data: null,
    });

    const { result } = renderHook(() => useGetGame("game-name"));
    expect(result.current.data).toEqual(data);
    expect(result.current.isLoading).toBe(false);
  });
  test("should return data from scraper if no game data from db", () => {
    vi.mocked(useGetGameFromNameDBQuery).mockReturnValue({
      ...mockedData,
      data: { data: [] },
    });

    vi.mocked(useGetGameFromScraperQuery).mockReturnValue({
      ...mockedData,
    });

    const { result } = renderHook(() => useGetGame("game-name"));
    expect(result.current.data).toEqual(data);
    expect(result.current.isLoading).toBe(false);
  });

  test("Should return error if both queries return error", () => {
    vi.mocked(useGetGameFromNameDBQuery).mockReturnValue({
      ...mockedData,
      error: true,
    });

    vi.mocked(useGetGameFromScraperQuery).mockReturnValue({
      ...mockedData,
      error: true,
    });

    const { result } = renderHook(() => useGetGame("game-name"));
    expect(result.current.error).toEqual(true);
    expect(result.current.isLoading).toBe(false);
  });
});
