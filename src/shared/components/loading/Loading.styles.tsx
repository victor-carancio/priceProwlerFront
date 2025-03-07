import styled from "styled-components";

const LoadingContainer = styled.div`
  margin: 0 auto;
  max-width: 1440px;
  height: calc(90vh + 60px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImgLoading = styled.img`
  width: 200px;
`;

export { LoadingContainer, ImgLoading };
