import { GameType } from "../../../../@types/global";
import CardGameContainer from "../card-game-container/CardGameContainer";
import { ResultContainer } from "./GamesContainer.styles";

interface GamesContainerProps {
  data: GameType[];
  isSmallSize?: boolean;
}

const GamesContainer = ({ data, isSmallSize }: GamesContainerProps) => {
  return (
    <ResultContainer $isSmallSize={isSmallSize}>
      {data.map((game) => {
        return (
          <CardGameContainer
            game={game}
            key={game.id}
            isSmallSize={isSmallSize}
          ></CardGameContainer>
        );
      })}
      {/* <EmptyDiv></EmptyDiv> */}
    </ResultContainer>
  );
};

export default GamesContainer;
