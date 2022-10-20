import { Link } from "react-router-dom";
import styled from "styled-components";
import { Props } from "../../types/NavbarProps";

export const NavbarContainer = styled.nav<Props>`
  width: 100vw;
  max-width: 100%;
  height: ${(props) => (props.extendNavbar ? "100vh" : "80px")};
  background-color: ${({ theme }) => theme.colors.bgColor};
  position: ${(props) => (props.extendNavbar ? "fixed" : "")};
  display: flex;
  flex-direction: column;
  font-weight: bold;

  @media (min-width: 700px) {
    height: 80px;
  }
`;

export const LeftContainer = styled.div`
  flex: 30%;
  display: flex;
  align-items: center;
  padding-left: 60px;

  @media (max-width: 700px) {
    padding-left: 10px;
  }
`;

export const RightContainer = styled.div`
  flex: 70%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 50px;

  @media (max-width: 700px) {
    padding-right: 10px;
  }
`;

export const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
`;

export const NavbarLinkContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const NavbarLink = styled(Link)`
  color: white;
  font-size: ${({ theme }) => theme.fonts.size.medium};
  font-family: ${({ theme }) => theme.fonts.family.default};
  text-decoration: none;
  margin: 10px;

  @media (max-width: 700px) {
    display: none;
  }
`;

export const NavProfileImgWrapper = styled.div`
  height: 32px;
  width: 32px;
`;

export const NavProfileImg = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

export const NavbarLinkExtended = styled(Link)`
  color: white;
  font-size: x-large;
  font-family: ${({ theme }) => theme.fonts.family.default};
  text-decoration: none;
  margin: 10px;
`;

export const Logo = styled.img`
  height: 2.8125rem;
  width: 10.4375rem;
  margin-right: 50px;
  cursor: pointer;
`;

export const OpenLinksButton = styled.button`
  width: 70px;
  height: 50px;
  background: none;
  border: none;
  color: white;
  font-size: 42px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-weight: bold;

  cursor: pointer;
  @media (min-width: 700px) {
    display: none;
  }
`;

export const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 700px) {
    display: none;
  }
`;
