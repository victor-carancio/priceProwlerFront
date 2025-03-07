import styled from "styled-components";
import { device, deviceMax } from "../../shared/styles/media";

interface ContainerGameProps {
  $imageUrl: string;
}

const ContainerGame = styled.div<ContainerGameProps>`
  margin: 0 auto;
  max-width: 1440px;
  padding: 40px 10px;
  width: 100%;

  @media ${device.tablet} {
    padding: 60px 15px;
  }

  @media ${device.laptop} {
    padding: 60px 90px;
  }

  @media ${device.desktop} {
    padding: 60px 125px;
  }
`;

const HeaderGame = styled.div<ContainerGameProps>`
  margin: 20px 0;
  padding: 20px 15px;
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

  background-color: ${({ theme }) => theme.cardGameOpaque};

  border-radius: 5px;
  @media ${device.tablet} {
    padding: 20px 10px;
    flex-flow: row;

    justify-content: center;
    align-items: center;
    height: 500px;
    gap: 15px;

    &::before {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: -1;
      display: block;
      margin: 0 auto;
      background-image: ${({ theme, $imageUrl }) =>
        `radial-gradient(${theme.bodyBackgroundGradient}), url(${$imageUrl}) `};
      background-repeat: no-repeat;
      background-position: top center;
      background-size: cover;
      /* width: 80%; */
      height: 100%;
      /* max-width: 1440px; */
      -webkit-filter: blur(7px);
      -moz-filter: blur(7px);
      -o-filter: blur(7px);
      -ms-filter: blur(7px);
      filter: blur(7px);
    }
  }
`;

const MainInfo = styled.div`
  width: 100%;
  @media ${device.tablet} {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;
  }

  @media ${device.laptop} {
    width: 60%;
  }
`;

const CoverGame = styled.img`
  width: 100%;
  height: 450px;
  object-fit: contain;
  border-radius: 5px;
  filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.8));

  @media ${device.tablet} {
    display: none;
  }
`;

const PricesDetail = styled.div`
  height: auto;
  width: 100%;
  max-width: 340px;
  margin: 60px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media ${device.tablet} {
    width: 40%;
    margin: 0;
    max-width: 450px;
  }

  @media ${device.laptop} {
    width: 30%;
    margin: 0;
    max-width: 450px;
  }
`;

const StoreContainer = styled.div`
  max-width: 500px;
  width: 100%;
  padding: 7px 0;
`;

const GalleryMobile = styled.div`
  margin: 0px auto;
  margin-bottom: 20px;
  filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.4));
  width: 80%;
  @media ${device.tablet} {
    display: none;
  }
`;

const GalleryTablet = styled.div`
  filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.4));
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
  @media ${deviceMax.tablet} {
    display: none;
  }
`;

const AboutGame = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 20px 10px;
  gap: 20px;
  @media ${device.laptop} {
    padding: 20px 0;
    width: 100%;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: flex-start;
  }
  h4 {
    font-size: 18px;
  }
  p,
  span {
    font-size: 15px;
    color: ${({ theme }) => theme.textBody};
  }
`;

const Overview = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  padding: 10px;
  /* background-color: ${({ theme }) => theme.background}; */
  background-color: ${({ theme }) => theme.cardGameOpaque};
  order: 2;
  display: flex;
  flex-direction: column;
  gap: 14px;
  @media ${device.laptop} {
    order: 1;
    width: 65%;
  }
`;
interface GameDescriptionProps {
  $isExpanded: boolean;
  $maxHeight: number;
}
const GameDescription = styled.div<GameDescriptionProps>`
  height: ${({ $isExpanded, $maxHeight }) =>
    $isExpanded ? `${$maxHeight}px` : "200px"};
  overflow: hidden;
  transition: height 300ms ease;
`;

// const ViewMore = styled.div`
//   box-sizing: content-box;
//   cursor: pointer;
//   align-self: flex-end;
//   text-align: center;
//   background-color: ${({ theme }) => theme.card};
//   padding: 3px 8px;
//   width: 100px;
//   font-size: 13px;
//   font-weight: 600;
//   color: ${({ theme }) => theme.textBody};
//   box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
//   border: 0.5px solid transparent;
//   transition: border-color 300ms ease-in-out, background-color 300ms ease-in-out;
//   &:hover {
//     color: ${({ theme }) => theme.text};
//     border-color: ${({ theme }) => theme.textBody};
//     background-color: ${({ theme }) => theme.background};
//   }
// `;

const InfoOfGame = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  padding: 10px;
  order: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  /* background-color: ${({ theme }) => theme.background}; */
  background-color: ${({ theme }) => theme.cardGameOpaque};
  @media ${device.laptop} {
    order: 2;
    width: 33%;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;

  & div:first-child {
    width: 102px;
  }
  p {
    font-weight: bold;
    width: 102px;
  }
  span {
    width: 68%;
    overflow: hidden;
  }
`;

const WebSiteContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 6px 8px;
  width: 100%;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.textBody};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border: 1px solid transparent;
  transition: border-color 300ms ease-in-out, background-color 300ms ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.text};
    border-color: ${({ theme }) => theme.textBody};
    background-color: ${({ theme }) => theme.background};
  }
`;

export {
  AboutGame,
  ContainerGame,
  CoverGame,
  GalleryMobile,
  GalleryTablet,
  GameDescription,
  HeaderGame,
  InfoContainer,
  MainInfo,
  InfoOfGame,
  Overview,
  WebSiteContainer,
  StoreContainer,
  PricesDetail,
};
