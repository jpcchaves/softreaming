import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const EditProfilePageContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const EditProfilePageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const LogoContainer = styled.div`
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const LogoWrapper = styled.div``;

export const Logo = styled.img`
  height: 2.8125rem;
  width: 10.4375rem;
  margin-left: 60px;
`;

export const LoginFormWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 400px;
  margin: 0 auto;
  padding: 40px 40px;
  max-width: 500px;
  width: 100%;
`;

export const FormTitle = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.white};
  `}
  margin-bottom: 28px;
`;

export const LoginForm = styled.form`
  width: 100%;
`;

export const GoBackLinkWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 2rem;
  text-align: center;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const GoBackLink = styled(Link)`
  color: ${({ theme }) => theme.colors.smokeWhite};
  font-size: ${({ theme }) => theme.fonts.size.bigSize2};
  text-decoration: none;
  transition: 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;