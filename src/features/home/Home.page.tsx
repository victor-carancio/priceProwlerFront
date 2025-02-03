import { useGetFeaturedGamesQuery } from "../../store/apis/gameApi";

import FeatureGames from "../../features/home/components/featureGames/FeatureGames";
import Loading from "../../shared/components/loading/Loading";
import { Helmet } from "react-helmet-async";
import SearchError from "../../shared/components/search-error/SearchError";
import { MainContainer } from "../../shared/styles/styled-components/main-container/mainContainer";
const Home = () => {
  const { data, isLoading, error } = useGetFeaturedGamesQuery("");

  if (isLoading) {
    return <Loading />;
  }
  if (error) return <SearchError />;
  // console.log(data);
  return (
    <>
      <Helmet>
        <title>Comparador de Precios de Videojuegos - Price Prowler</title>
        <meta
          name="description"
          content="Encuentra los mejores precios para tus juegos en un solo lugar."
        />
      </Helmet>
      <MainContainer>
        {data?.map((featured, index) => {
          const { feature, games } = featured;
          return <FeatureGames key={index} feature={feature} games={games} />;
        })}
      </MainContainer>
    </>
  );
};

export default Home;
