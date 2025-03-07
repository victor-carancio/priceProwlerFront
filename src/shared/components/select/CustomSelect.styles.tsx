import styled from "styled-components";
import { device } from "../../styles/media";

interface SelectContainerProps {
  $autoSize?: boolean;
}

const SelectContainer = styled.div<SelectContainerProps>`
  display: flex;
  flex-direction: column;
  /* min-width: none; */
  min-width: ${({ $autoSize }) => ($autoSize ? "auto" : "270px")};
  width: auto;
  max-width: 400px;

  @media ${device.tablet} {
    width: 350px;
    min-width: 350px;
  }
  font-family: "Roboto", sans-serif;
`;

const StyledSelect = styled.select`
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  font-weight: 600;
  font-family: "Roboto", sans-serif !important;
  background-color: ${({ theme }) => theme.selectBackground};
  color: ${({ theme }) => theme.text};
  padding: 8px 12px;
  font-size: 12px;
  border: 1px solid ${({ theme }) => theme.selectBorder};
  border-radius: 4px;

  @media ${device.tablet} {
    font-size: 13px;
  }
  &:focus {
    outline: none;
  }
  option {
    border: none;
  }
`;

export { SelectContainer, StyledSelect };
