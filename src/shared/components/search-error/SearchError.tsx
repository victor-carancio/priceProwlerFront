import { StyledIcon } from "../logo/logo";
import { FaFaceGrinBeamSweat } from "react-icons/fa6";
import { SearchErrorContainer } from "./SearchError.styles";

const SearchError = () => {
  return (
    <SearchErrorContainer>
      <h2>Ocurrio un error inesperado, vuelva a intentarlo más tarde.</h2>
      <StyledIcon size="100px">
        <FaFaceGrinBeamSweat />
      </StyledIcon>
    </SearchErrorContainer>
  );
};

export default SearchError;
