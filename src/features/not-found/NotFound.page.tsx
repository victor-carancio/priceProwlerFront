import CustomBtn from "../../shared/components/custom-btn/CustomBtn";
import { useNavigate } from "react-router-dom";
import { NotFoundContainer } from "./NotFound.styles";

const NotFound = () => {
  const navigate = useNavigate();

  const handleNavigateToDetail = () => {
    navigate(`/`);
  };
  return (
    <NotFoundContainer>
      <h2>404 Not Found</h2>
      <h3>
        La página que estas buscando no existe.
        <strong> Vuelve al inicio</strong>.
      </h3>
      <CustomBtn
        text="Volver al inicio"
        size="24px"
        onClick={handleNavigateToDetail}
      ></CustomBtn>
    </NotFoundContainer>
  );
};

export default NotFound;
