import styled from "styled-components";
import CustomBtn from "../../shared/components/custom-btn/CustomBtn";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleNavigateToDetail = () => {
    navigate(`/`);
  };
  return (
    <NotFoundContainer>
      <h2>404 Not Found</h2>
      <h3>
        La página que estas buscando no existe.{" "}
        <strong>Vuelve al inicio</strong>.
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

const NotFoundContainer = styled.div`
  margin: 0 auto;
  max-width: 1440px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  h2 {
    font-size: 70px;
  }
`;
