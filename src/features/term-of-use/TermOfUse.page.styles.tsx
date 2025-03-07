import styled from "styled-components";

const TermOfUseContainer = styled.section`
  padding: 100px;
  margin: 0 auto;
  /* height: calc(90vh + 60px); */
  width: 100%;
  max-width: 1440px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: flex-start;
  gap: 30px;
  text-align: justify;

  h2 {
    font-size: 30px;
  }

  h2,
  h3 {
    color: ${({ theme }) => theme.text};
  }

  p {
    color: ${({ theme }) => theme.textBody};
    /* letter-spacing: 2px; */
  }
`;

const ListOfTerms = styled.ul`
  list-style: decimal;
  display: flex;
  flex-direction: column;
  gap: 10px;

  li {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  h3 {
    font-size: 22px;
  }
`;

const ListElements = styled.li`
  /* margin: 60px 0; */
  /* display: flex; */
  /* flex-direction: column; */
  /* gap: 10px; */
`;

export { ListElements, ListOfTerms, TermOfUseContainer };
