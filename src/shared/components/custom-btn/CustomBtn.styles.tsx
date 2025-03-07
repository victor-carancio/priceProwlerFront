import styled from "styled-components";

interface ButtonProps {
  $size?: string;
}

const Button = styled.div<ButtonProps>`
  cursor: pointer;
  background-color: ${({ theme }) => theme.button};
  border-radius: 3px;
  width: auto;
  height: auto;
  padding: 8px 14px;
  display: flex;
  justify-content: space-between;
  /* font-size: ${({ $size }) => ($size ? $size : "10px")}; */
  align-items: center;
  gap: 10px;
  transition: background-color ease-in-out 300ms;
  color: ${({ theme }) => theme.customButtonTextColor};
  filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.2));
  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
  p {
    font-size: ${({ $size }) => ($size ? $size : "10px")};
    font-weight: bold;
  }
`;

export { Button };
