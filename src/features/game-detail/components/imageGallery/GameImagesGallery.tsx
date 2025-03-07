import ImagesGallery, { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import { StyledGalleryWrapper } from "./GameIamgesGallery.styles";
// import { device } from "../../styles/media";

//ejmplo
// const images = [
//   {
//     original: "https://picsum.photos/id/1018/1000/600/",
//     thumbnail: "https://picsum.photos/id/1018/250/150/",
//     fullscreen: "https://picsum.photos/id/1018/1000/600/",
//   },
//   {
//     original: "https://picsum.photos/id/1015/1000/600/",
//     thumbnail: "https://picsum.photos/id/1015/250/150/",
//     fullscreen: "https://picsum.photos/id/1018/1000/600/",
//   },
//   {
//     original: "https://picsum.photos/id/1019/1000/600/",
//     thumbnail: "https://picsum.photos/id/1019/250/150/",
//     fullscreen: "https://picsum.photos/id/1018/1000/600/",
//   },
//   {
//     original: "https://www.youtube.com/embed/5FrhtahQiRc",
//     thumbnail: "https://img.youtube.com/vi/5FrhtahQiRc/0.jpg",
//     fullscreen: "https://www.youtube.com/embed/5FrhtahQiRc",
//   },
// ];

interface GameImagesGalleryProps {
  images: { original: string; thumbnail: string }[];
}
const GameImagesGallery = ({ images }: GameImagesGalleryProps) => {
  const renderItem = (item: ReactImageGalleryItem) => {
    return <img className="image-gallery-image" src={item.original} />;
  };

  return (
    <StyledGalleryWrapper>
      <ImagesGallery
        items={images}
        renderItem={renderItem}
        autoPlay={false}
        showNav={false}
        showPlayButton={false}
      />
    </StyledGalleryWrapper>
  );
};

export default GameImagesGallery;
