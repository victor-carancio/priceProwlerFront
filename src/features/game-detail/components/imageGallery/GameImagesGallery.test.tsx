import { render, screen } from "@testing-library/react";
import GameImagesGallery from "./GameImagesGallery";
import ImagesGallery from "react-image-gallery";

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
    fullscreen: "https://picsum.photos/id/1018/1000/600/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
    fullscreen: "https://picsum.photos/id/1018/1000/600/",
  },
];

vi.mock("react-image-gallery", () => ({
  __esModule: true,
  default: vi.fn(() => <div data-testid="mock-gallery">Galería</div>),
}));

describe("GameImageGallery component test", () => {
  test("Should render component correctly", () => {
    render(<GameImagesGallery images={images} />);

    expect(screen.getByTestId("mock-gallery")).toBeInTheDocument();
    expect(ImagesGallery).toHaveBeenCalledWith(
      expect.objectContaining({ items: images }),
      expect.anything()
    );
  });
});
