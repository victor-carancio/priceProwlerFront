import styled from "styled-components";
import { device } from "../../styles/media";

const FooterContainer = styled.footer`
  height: 250px;
  padding: 40px 0px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  /* gap: 20px; */
  background-color: ${({ theme }) => theme.footerBackground};
  color: ${({ theme }) => theme.footerText};

  @media ${device.laptop} {
    height: 200px;
  }
`;

const Copyright = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: 20px;
`;
const Separator = styled.hr`
  opacity: 0.7;
  height: 0px;
  border: none;
  border-top: ${({ theme }) => `0.5px solid ${theme.footerText}`};
`;

const TermOfUse = styled.p.attrs({ as: "div" })`
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 300ms ease-in-out;
  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;

const DeveloperBy = styled.div`
  width: 70%;
  p {
    font-weight: 600;
    text-align: center;
    margin-top: 15px;
  }
`;
export { Copyright, DeveloperBy, FooterContainer, Separator, TermOfUse };
