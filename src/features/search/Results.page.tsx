import { useSearchParams } from "react-router-dom";

import { GameType } from "../../@types/global.d";
import CustomSelect from "../../shared/components/select/CustomSelect";
import { useState } from "react";
import { useGetGame } from "./hooks/useGetGame";
import Loading from "../../shared/components/loading/Loading";
import { Helmet } from "react-helmet-async";
import ResultNotFound from "../../shared/components/result-not-found/ResultNotFound";
import SearchError from "../../shared/components/search-error/SearchError";
import { sortOptions } from "../../utils";
import GamesContainer from "../../shared/components/games-container/games-container/GamesContainer";
import { MainContainer } from "../../shared/styles/styled-components/main-container/mainContainer";
import { ResultHeader } from "./Results.page.styles";

const Results = () => {
  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get("search") || "";
  const [selectedValue, setSelectValue] = useState("price-asc");

  const handleSelectedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };

  const { data, error, isLoading } = useGetGame(searchTerm);

  if (isLoading) return <Loading />;
  if (error) return <SearchError />;
  if (data?.nbHts === 0 || !data?.data.length) return <ResultNotFound />;

  return (
    <>
      <Helmet>
        <title>{searchTerm} | Búsqueda | Price Prowler</title>
        <meta
          name="description"
          content="Busca videojuegos por nombre, compara precios actualizados para aprovechar los decuentos de tus tiendas favoritas."
        />
      </Helmet>
      <MainContainer>
        {data && (
          <>
            <ResultHeader>
              <h3>Resultados: {data.nbHts}</h3>
              <CustomSelect
                options={sortOptions}
                value={selectedValue}
                onChange={handleSelectedChange}
                autosize={true}
                // placeholder="ordenar por"
              />
            </ResultHeader>
            <GamesContainer
              data={sortGames(data.data, selectedValue)}
              // isSmallSize={true}
            />
          </>
        )}
      </MainContainer>
    </>
  );
};

const sortGames = (data: GameType[], sortKey: string) => {
  const sortOption = sortKey.split("-");
  const sort = sortOption[0];
  const order = sortOption[1] === "asc" ? 1 : -1;

  let gamesSorted: GameType[] = [];
  if (sort === "alphabetical") {
    gamesSorted = [...data].sort((a, b) => {
      const gameA = a.gameName;
      const gameB = b.gameName;

      if (gameA > gameB) {
        return 1 * order;
      }
      if (gameA < gameB) {
        return -1 * order;
      }
      return 0;
    });
  }

  if (sort === "price") {
    gamesSorted = [...data].sort((a, b) => {
      const finalPriceA = parseInt(a.stores[0].info_price.final_price);
      const finalPriceB = parseInt(b.stores[0].info_price.final_price);

      if (isNaN(finalPriceA)) return -1;
      if (isNaN(finalPriceB)) return 1;

      if (finalPriceA > finalPriceB) {
        return 1 * order;
      }
      if (finalPriceA < finalPriceB) {
        return -1 * order;
      }
      return 0;
    });
  }

  return gamesSorted;
};

export default Results;
