import { useNavigate } from "react-router-dom";
import {
  Copyright,
  DeveloperBy,
  FooterContainer,
  Separator,
  TermOfUse,
} from "./Footer.styles";

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigateToTerm = () => {
    navigate(`/term-of-use`);
    window.scrollTo(0, 0);
  };

  const year = new Date().getFullYear();

  return (
    <FooterContainer>
      <Copyright>
        &copy; {year} Price Prowler. Todos los derechos reservados.
      </Copyright>
      <TermOfUse onClick={handleNavigateToTerm}>
        Términos de uso | Política de privacidad
      </TermOfUse>
      <DeveloperBy>
        <Separator />
        <p>Desarrollado por Victor Carancio</p>
      </DeveloperBy>
    </FooterContainer>
  );
};

export default Footer;
