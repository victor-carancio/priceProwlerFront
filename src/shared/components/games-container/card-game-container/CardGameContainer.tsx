import { useNavigate } from "react-router-dom";
import { GameType } from "../../../../@types/global";
import { capitalizeEachWord, getImgGame } from "../../../../utils";
// import StorePrice from "../../store-price/StorePrice";
import {
  CardGame,
  ImgContainer,
  ImgGame,
  InfoGame,
  StoresContainer,
  TitleGame,
} from "./CardGameContainer.styles";
import StorePrice from "../../store-price/store-price/StorePrice";

interface CardGameContainerProps {
  game: GameType;
  isSmallSize?: boolean;
}

const CardGameContainer = ({ game, isSmallSize }: CardGameContainerProps) => {
  const navigate = useNavigate();

  const handleNavigateToDetail = (id: number) => {
    navigate(`/game/${id}`);
  };

  return (
    <CardGame
      key={game.id}
      $imageUrl={getImgGame(game)}
      onClick={() => handleNavigateToDetail(game.id)}
      $isSmallSize={isSmallSize}
    >
      <ImgContainer>
        <ImgGame
          src={getImgGame(game)}
          alt={`${game.gameName}-img`}
          // onClick={() => handleNavigateToDetail(game.id)}
          $isSmallSize={isSmallSize}
        />
      </ImgContainer>

      <InfoGame>
        <TitleGame>{capitalizeEachWord(game.gameName)}</TitleGame>
        <StoresContainer>
          <StorePrice store={game.stores[0]} shouldRedirect={false} />
        </StoresContainer>
      </InfoGame>
    </CardGame>
  );
};

export default CardGameContainer;
