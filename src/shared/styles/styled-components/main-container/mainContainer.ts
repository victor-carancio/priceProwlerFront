import styled from "styled-components";
import { device } from "../../media";

//contenedor de gamecontainer
export const MainContainer = styled.section`
  margin: 0 auto;
  width: 100%;
  max-width: 1440px;
  padding: 50px 15px;
  display: flex;
  flex-direction: column;
  min-height: calc(90vh - 150px);

  align-items: center;
  gap: 40px;
  @media ${device.tablet} {
    align-items: flex-start;

    /* max-width: 80%; */
    padding: 50px 20px;
  }

  @media ${device.laptop} {
    align-items: flex-start;

    max-width: 80%;
    padding: 75px 0px;
  }

  @media ${device.desktop} {
    max-width: 1200px;
  }
`;
