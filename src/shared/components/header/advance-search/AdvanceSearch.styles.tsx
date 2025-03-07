import styled from "styled-components";
import { device } from "../../../styles/media";

interface AdvanceSearchOverlayProps {
  $isOpen?: boolean;
  $isAdvanceSearch: boolean;
}

const AdvanceSearchOverlay = styled.div<AdvanceSearchOverlayProps>`
  margin-top: 110px;

  background-color: ${({ theme }) => theme.headerOverlayBackground};
  /* height: ${(props) => (props.$isOpen ? "250px" : "0px")}; */
  /* height: 100%; */
  height: ${({ $isAdvanceSearch, $isOpen }) =>
    $isAdvanceSearch && $isOpen ? "100vh" : "0px"};
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 10;
  overflow: hidden;
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px; */
  transition: height 300ms ease-in-out, padding 300ms ease-in-out;
  @media ${device.laptop} {
    margin-top: 60px;
    height: ${({ $isAdvanceSearch }) => ($isAdvanceSearch ? "100vh" : "0px")};
  }
`;

const AdvanceSearchContainer = styled.form`
  background-color: ${({ theme }) => theme.headerOverlay};
  display: flex;
  position: relative;
  z-index: 99;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 20px 0;
  width: 100%;
  height: 230px;
  @media ${device.tablet} {
    /* width: 700px; */
  }
`;

const CloseOverlay = styled.div`
  position: absolute;

  top: 0;
  right: 0;
`;

export { AdvanceSearchContainer, AdvanceSearchOverlay, CloseOverlay };
