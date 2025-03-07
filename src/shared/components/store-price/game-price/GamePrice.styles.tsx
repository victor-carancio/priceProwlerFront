import styled from "styled-components";
import { StoreTypes } from "../../../../@types/global";
import { storeColors } from "../../../styles/theme";
import { device } from "../../../styles/media";

interface StoreNameProps {
  $storeName: string;
  $shouldHover?: boolean;
  $detail?: boolean;
}

const NormalPrice = styled.p<StoreNameProps>`
  font-size: ${({ $detail }) => ($detail ? "14px" : "14px")};
  font-weight: bold;
  color: ${({ $storeName }) =>
    storeColors[$storeName as StoreTypes].normalpriceColor};

  @media ${device.mobile} {
    font-size: ${({ $detail }) => ($detail ? "15px" : "14px")};
  }
  @media ${device.tablet} {
    font-size: ${({ $detail }) => ($detail ? "15px" : "14px")};
  }
`;

const DiscountPrice = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Discount = styled.div<StoreNameProps>`
  height: 100%;
  width: ${({ $detail }) => ($detail ? "55px" : "35px")};
  padding: 0 5px;
  background-color: ${({ $storeName }) =>
    storeColors[$storeName as StoreTypes].offerBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    font-size: ${({ $detail }) => ($detail ? "18px" : "13px")};
    font-weight: bold;
    color: ${({ $storeName }) =>
      storeColors[$storeName as StoreTypes].offerFontColor};
  }

  @media ${device.mobile} {
    width: 50px;
    p {
      font-size: ${({ $detail }) => ($detail ? "18px" : "13px")};
      font-weight: bold;
    }
  }

  @media ${device.tablet} {
    width: 50px;
    p {
      font-size: ${({ $detail }) => ($detail ? "18px" : "13px")};
      font-weight: bold;
    }
  }
`;

const Prices = styled.div`
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 100%;
  padding: 0 7px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

const InitialPrice = styled.p<StoreNameProps>`
  font-size: ${({ $detail }) => ($detail ? "11px" : "12px")};
  font-weight: bold;
  text-decoration: line-through;
  color: ${({ $storeName }) =>
    storeColors[$storeName as StoreTypes].initialPriceColor};

  @media ${device.mobile} {
    font-size: ${({ $detail }) => ($detail ? "12px" : "12px")};
  }

  @media ${device.tablet} {
    font-size: ${({ $detail }) => ($detail ? "12px" : "12px")};
  }
`;

export { InitialPrice, Prices, NormalPrice, Discount, DiscountPrice };
