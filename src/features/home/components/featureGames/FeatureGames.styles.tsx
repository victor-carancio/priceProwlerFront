import styled from "styled-components";
import { device } from "../../../../shared/styles/media";

interface FeatureContainerProps {
  $isOpen?: boolean;
  $maxHeight?: number;
}

const FeatureContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TitleFeature = styled.h2`
  margin-bottom: 15px;

  @media ${device.tablet} {
    margin-bottom: 20px;
  }
`;

const FeatureGamesType = styled.div<FeatureContainerProps>`
  height: ${({ $isOpen, $maxHeight }) =>
    $isOpen ? `${$maxHeight}px` : "685px"};

  overflow: hidden;
  transition: height 300ms ease;
  @media ${device.tablet} {
    height: ${({ $isOpen, $maxHeight }) =>
      $isOpen ? `${$maxHeight}px` : "625px"};
  }
`;

export { FeatureGamesType, FeatureContainer, TitleFeature };
