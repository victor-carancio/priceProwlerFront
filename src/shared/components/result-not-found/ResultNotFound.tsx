// import React from "react";
import { FaFaceFrown } from "react-icons/fa6";
import { StyledIcon } from "../logo/logo";
import { NotFoundContainer } from "./ResultNotFound.styles";

const ResultNotFound = () => {
  return (
    <NotFoundContainer>
      <h2>No se han encontrado resultados, intenta otra búsqueda</h2>

      <StyledIcon size="100px">
        <FaFaceFrown aria-label="face-frown-icon" />
      </StyledIcon>
    </NotFoundContainer>
  );
};

export default ResultNotFound;
