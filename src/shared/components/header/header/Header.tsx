import { IoIosSearch, IoIosSunny, IoIosMoon } from "react-icons/io";
import { StyledIcon } from "../../logo/logo";
import { useAppSelector } from "../../../../store/hooks/useAppSelector";
import { useAppDispatch } from "../../../../store/hooks/useAppDispatch";
import { toggleTheme } from "../../../../store/slices/uiSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdvanceSearch from "../advance-search/AdvanceSearch";
import SearchInput from "../search-input/SearchInput";
import {
  HeaderContainer,
  LogoImg,
  Nav,
  SearchOverlay,
  ThemeSwitch,
} from "./Header.styles";
import { ThemeEnum } from "../../../../@types/global.d";

const Header = () => {
  const dispatch = useAppDispatch();
  const [openSearch, setOpenSearch] = useState(false);

  const [isAdvanceSearch, setIsAdvanceSearch] = useState(false);
  const theme = useAppSelector((state) => state.ui.theme);
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate(`/`);
  };
  const searchInputToggle = () =>
    setOpenSearch(() => (openSearch ? false : true));

  const advanceSearchToggle = () =>
    setIsAdvanceSearch(() => (isAdvanceSearch ? false : true));

  return (
    <>
      <HeaderContainer $isAdvanceSearch={isAdvanceSearch}>
        <LogoImg
          src="/assets/pp-logo.png"
          alt="pp-logo.png"
          onClick={handleNavigateToHome}
        />

        <div className="hide-on-mobile">
          <SearchInput onClick={advanceSearchToggle} />
        </div>
        <Nav>
          <div className="hide-on-desktop">
            <StyledIcon>
              <IoIosSearch onClick={searchInputToggle} />
            </StyledIcon>
          </div>

          <ThemeSwitch onClick={() => dispatch(toggleTheme())}>
            <StyledIcon>
              {theme === ThemeEnum.LIGHT ? (
                <IoIosMoon data-testid="moon-icon" />
              ) : (
                <IoIosSunny data-testid="sun-icon" />
              )}
            </StyledIcon>
          </ThemeSwitch>
        </Nav>
      </HeaderContainer>
      <SearchOverlay $isOpen={openSearch}>
        <SearchInput onClick={advanceSearchToggle} />
      </SearchOverlay>
      <AdvanceSearch
        advanceSearchToggle={advanceSearchToggle}
        isAdvanceSearch={isAdvanceSearch}
        openSearch={openSearch}
      />
    </>
  );
};

export default Header;
