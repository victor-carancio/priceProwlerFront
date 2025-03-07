import styled from "styled-components";
import { StoreTypes } from "../../../../@types/global";
import { storeColors } from "../../../styles/theme";
import { device } from "../../../styles/media";

interface StoreNameProps {
  $storeName: string;
  $shouldHover?: boolean;
  $detail?: boolean;
}

export const StoreGame = styled.a<StoreNameProps>`
  cursor: pointer;

  background-color: ${({ $storeName }) =>
    storeColors[$storeName as StoreTypes].cardBackground};
  width: 100%;
  height: ${({ $detail }) => ($detail ? "50px" : "35px")};
  padding-left: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  color: ${({ $storeName }) =>
    storeColors[$storeName as StoreTypes].cardFontColor};
  @media ${device.tablet} {
    height: ${({ $detail }) => ($detail ? "50px" : "35px")};
  }
  transition: background-color 300ms ease, transform 300ms ease;
  filter: ${({ $detail }) =>
    $detail ? "drop-shadow(0 0 8px rgba(0, 0, 0, 0.6))" : ""};

  ${({ $shouldHover, $storeName }) =>
    $shouldHover &&
    `
     &:hover {
      background-color: 
      ${storeColors[$storeName as StoreTypes].hoverCardBackground};
      transform: translate(0, -2px);
    }
    `}
`;

const StoreInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

export { StoreInfo };
