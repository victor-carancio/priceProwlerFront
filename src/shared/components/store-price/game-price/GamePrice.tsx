import { StoreReduced } from "../../../../@types/global";

import {
  Discount,
  DiscountPrice,
  InitialPrice,
  NormalPrice,
  Prices,
} from "./GamePrice.styles";

export type StoreGamePrice = Pick<StoreReduced, "info_price" | "store">;
interface PriceProps {
  store: StoreGamePrice;
  detail?: boolean;
}
const GamePrice = ({ store, detail }: PriceProps) => {
  const { final_price, currency, discount_percent, initial_price } =
    store.info_price;

  if (final_price === "0") {
    return (
      <Prices>
        <NormalPrice $storeName={store.store} $detail={detail}>
          -
        </NormalPrice>
      </Prices>
    );
  }

  if (discount_percent !== "0" && discount_percent !== "-") {
    return (
      <DiscountPrice>
        <Discount $storeName={store.store} $detail={true}>
          <p>{`${discount_percent}%`}</p>
        </Discount>
        <Prices>
          <InitialPrice
            $storeName={store.store}
            $detail={detail}
          >{`${initial_price} ${currency}`}</InitialPrice>
          <NormalPrice $storeName={store.store} $detail={detail}>
            {`${final_price} ${currency}`}
          </NormalPrice>
        </Prices>
      </DiscountPrice>
    );
  }

  return (
    <Prices>
      <NormalPrice $storeName={store.store} $detail={detail}>
        {final_price !== "Gratis" && final_price !== "Próximamente"
          ? `${final_price} ${currency}`
          : final_price}
      </NormalPrice>
    </Prices>
  );
};

export default GamePrice;
