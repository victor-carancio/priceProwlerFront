import styled from "styled-components";
import { device } from "../../../styles/media";

interface ResultContainerProps {
  $isSmallSize?: boolean;
}

const ResultContainer = styled.div<ResultContainerProps>`
  margin: 0 auto;
  width: 100%;
  /* max-width: 1440px; */
  /* padding: 50px 15px; */
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
  /* gap: ${({ $isSmallSize }) => ($isSmallSize ? "20px" : "50px")}; */
  justify-content: center;
  align-items: center;

  @media ${device.tablet} {
    flex-flow: row wrap;
    justify-content: center;
  }

  @media ${device.laptop} {
    flex: 1;
    flex-flow: row wrap;
    justify-content: center;
  }
  @media ${device.desktop} {
    justify-content: center;
  }
`;
export { ResultContainer };
