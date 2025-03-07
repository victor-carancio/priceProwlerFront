import { ImgLoading, LoadingContainer } from "./Loading.styles";

const Loading = () => {
  return (
    <LoadingContainer>
      <ImgLoading src="/assets/Bean-Eater-loader.gif" alt="loading-img" />
      <h2>Esto puede tomar unos momentos...</h2>
    </LoadingContainer>
  );
};

export default Loading;
