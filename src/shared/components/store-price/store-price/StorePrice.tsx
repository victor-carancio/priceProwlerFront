import { StoreReduced } from "../../../../@types/global";
import { StyledStoreIcon } from "../../logo/logo";
import GamepassIcon from "../gamepass-icon/GamepassIcon";

import GamePrice from "../game-price/GamePrice";
import { StoreGame, StoreInfo } from "./StorePrice.styles";

export type StorePriceType = Pick<
  StoreReduced,
  "info_price" | "store" | "url" | "gamepass"
>;
interface StorePriceProps {
  store: StorePriceType;
  shouldRedirect: boolean;
}

const StorePrice = ({ store, shouldRedirect }: StorePriceProps) => {
  const StoreComponent = shouldRedirect ? "a" : "div";
  const storePriceProps = { store: store.store, info_price: store.info_price };

  return (
    <StoreGame
      href={shouldRedirect ? store.url : undefined}
      target={shouldRedirect ? "_blank" : undefined}
      rel={shouldRedirect ? "noopener noreferrer" : undefined}
      as={StoreComponent}
      data-testid="store-price"
      $storeName={store.store}
      $shouldHover={shouldRedirect}
      $detail={shouldRedirect}
    >
      <StoreInfo>
        <StyledStoreIcon
          store={store.store}
          size={shouldRedirect ? "40px" : undefined}
        />
        {store.store === "Xbox" && store.gamepass && (
          <GamepassIcon
            height={shouldRedirect ? "40px" : "25px"}
            fill="#f2ecff"
          />
        )}
      </StoreInfo>

      <GamePrice store={storePriceProps} detail={shouldRedirect}></GamePrice>
    </StoreGame>
  );
};

export default StorePrice;
