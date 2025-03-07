import styled from "styled-components";

const PaginationContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 7px;
`;

const PaginationNumber = styled.div`
  cursor: pointer;
  height: 25px;
  font-size: 18px;
  padding: 2px;
  transition: color 300ms ease-in-out;
  &:hover {
    color: ${({ theme }) => theme.textHover};
  }
`;

const CurrentPage = styled.div`
  font-weight: 700;
  font-size: 20px;
  height: 25px;
  padding: 2px;

  border-bottom: 1px solid ${({ theme }) => theme.text};
`;

export { CurrentPage, PaginationContainer, PaginationNumber };
