import styled from "styled-components";

const StyledGalleryWrapper = styled.div`
  .image-gallery-content .image-gallery-slide .image-gallery-image {
    object-fit: contain;
    max-width: 600px;
    max-height: 309px;
    overflow: hidden;
    object-position: center center;
  }
  & .fullscreen .image-gallery-slide .image-gallery-image {
    max-height: 90vh;
    max-width: 1440px;
    height: 100vh;
  }
  .image-gallery-content .image-gallery-thumbnail-image {
    max-height: 51.83px;
    object-fit: contain;
  }
`;

export { StyledGalleryWrapper };
