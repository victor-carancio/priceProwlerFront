import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";

import { useGetGameWithFiltersQuery } from "../../store/apis/gameApi";
import Loading from "../../shared/components/loading/Loading";
import SearchError from "../../shared/components/search-error/SearchError";
import ResultNotFound from "../../shared/components/result-not-found/ResultNotFound";

import Pagination from "../../features/advance-search/components/Pagination";
import GamesContainer from "../../shared/components/games-container/games-container/GamesContainer";
import { MainContainer } from "../../shared/styles/styled-components/main-container/mainContainer";
import { ResultHeader } from "./AdvanceResults.styles";

const AdvanceResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading, error, isFetching } = useGetGameWithFiltersQuery(
    Object.fromEntries(searchParams)
  );

  if (isLoading || isFetching) return <Loading />;
  if (error) return <SearchError />;
  if (data?.nbHts === 0 || !data?.games.length) return <ResultNotFound />;

  const prevPage = () => {
    if (data.currentPage > 1) {
      setSearchParams(
        (prev) =>
          new URLSearchParams({
            ...Object.fromEntries(prev),
            page: (data.currentPage - 1).toString(),
          })
      );
      window.scrollTo(0, 0);
      // navigate(`${url}&page=${data.currentPage - 1}`);
    }
  };

  const nextPage = () => {
    if (data.currentPage !== data.totalPages) {
      setSearchParams(
        (prev) =>
          new URLSearchParams({
            ...Object.fromEntries(prev),
            page: (data.currentPage + 1).toString(),
          })
      );

      window.scrollTo(0, 0);
      // navigate(`${url}&page=${data.currentPage + 1}`);
    }
  };

  const clickPage = (page: number) => {
    setSearchParams(
      (prev) =>
        new URLSearchParams({
          ...Object.fromEntries(prev),
          page: page.toString(),
        })
    );
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Helmet>
        <title> Búsqueda avanzada | Price Prowler</title>
        <meta
          name="description"
          content="Busca videojuegos por nombre, compara precios actualizados para aprovechar los decuentos de tus tiendas favoritas."
        />
      </Helmet>
      <MainContainer>
        {data && (
          <>
            <ResultHeader>
              <h3>
                {`Mostrando ${(data.currentPage - 1) * 20 + 1} - ${Math.min(
                  data.currentPage * 20,
                  data.totalGames
                )} de ${data.totalGames}`}
              </h3>
            </ResultHeader>
            <GamesContainer data={data.games} />
            <Pagination
              currentPage={data.currentPage}
              totalPages={data.totalPages}
              prevPage={prevPage}
              nextPage={nextPage}
              clickPage={clickPage}
            />
          </>
        )}
      </MainContainer>
    </>
  );
};

export default AdvanceResults;
