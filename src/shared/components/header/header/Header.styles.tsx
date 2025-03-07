import styled from "styled-components";
import { device } from "../../../styles/media";

interface HeaderProps {
  $isAdvanceSearch: boolean;
}

const HeaderContainer = styled.header<HeaderProps>`
  width: 100%;
  padding: 0 25px;
  height: 60px;
  position: sticky;
  top: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.header};
  z-index: 100;
  @media ${device.laptop} {
    padding: 0 40px;
  }
`;

interface SearchOverlayProps {
  $isOpen?: boolean;
}

export const SearchOverlay = styled.div<SearchOverlayProps>`
  width: 100%;
  padding: 0 25px;
  height: ${(props) => (props.$isOpen ? "50px" : "0")};
  background-color: ${({ theme }) => theme.header};
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;

  z-index: 99;
  overflow: hidden;
  transition: height 100ms ease-in-out;
  @media ${device.laptop} {
    display: none;
  }
`;

const LogoImg = styled.img`
  height: 40px;
  cursor: pointer;
  transition: filter ease-in-out 100ms;
  &:hover {
    filter: brightness(0.6);
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  @media ${device.laptop} {
    gap: 20px;
  }
`;

const ThemeSwitch = styled.div``;

export { ThemeSwitch, HeaderContainer, LogoImg, Nav };
