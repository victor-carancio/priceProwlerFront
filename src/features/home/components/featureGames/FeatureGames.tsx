import { GameType } from "../../../../@types/global";
import { useRef, useState } from "react";
import { ViewMore } from "../../../../shared/styles/styled-components/viewMore/ViewMoreButton";
import GamesContainer from "../../../../shared/components/games-container/games-container/GamesContainer";
import {
  FeatureContainer,
  FeatureGamesType,
  TitleFeature,
} from "./FeatureGames.styles";

interface FeatureGamesProps {
  feature: string;
  games: GameType[];
}
const FeatureGames = ({ feature, games }: FeatureGamesProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState(0);
  const contentRef = useRef<HTMLParagraphElement>(null);

  const toggleExpand = () => {
    if (contentRef.current) {
      setMaxHeight(contentRef.current.scrollHeight);
    }

    setIsOpen(!isOpen);
  };

  return games.length ? (
    <FeatureContainer>
      <TitleFeature>{feature}</TitleFeature>
      {games.length >= 12 ? (
        <>
          <FeatureGamesType
            $isOpen={isOpen}
            $maxHeight={maxHeight}
            ref={contentRef}
          >
            <GamesContainer data={games} isSmallSize={true} />
          </FeatureGamesType>
          <ViewMore onClick={toggleExpand}>
            {isOpen ? "Ver Menos" : "Ver Más"}
          </ViewMore>
        </>
      ) : (
        <div>
          <GamesContainer data={games} isSmallSize={true} />
        </div>
      )}
    </FeatureContainer>
  ) : (
    <></>
  );
};

export default FeatureGames;
