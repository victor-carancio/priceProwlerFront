import styled from "styled-components";
import { device } from "../../../styles/media";

const InputContainer = styled.form`
  width: 100%;
  max-width: 700px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  @media ${device.laptop} {
    height: 50px;
    width: 800px;
  }
`;

const Input = styled.input`
  padding: 0 40px 0px 20px;
  height: 70%;
  width: 100%;
  font-weight: bold;
  font-size: 13px;
  background-color: ${({ theme }) => theme.card};
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  /* .input-logo {
    position: absolute;
    right: 10px;
    transform: scale(0.8);
  } */
`;

const InputLogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  position: absolute;
  right: 10px;
  transform: scale(0.8);
`;
export { Input, InputContainer, InputLogoContainer };
