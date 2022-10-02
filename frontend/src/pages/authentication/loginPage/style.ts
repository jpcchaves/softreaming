import styled, { css } from "styled-components";

import { Link } from "react-router-dom";

export const EnterPageContainer = styled.header`
  height: 100vh;
  max-width: 100vw;
  background-image: url("./../src/assets/bg_poster/netflix_poster.jpg");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const EnterPageWrapper = styled.div`
  height: 100%;
  width: 100%;
  background: radial-gradient(
    ellipse,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.8) 90%
  );
  background-color: rgba(0, 0, 0, 0.2);
`;

export const LogoWrapper = styled.div`
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const LogoLink = styled(Link)``;

export const Logo = styled.img`
  height: 2.8125rem;
  width: 10.4375rem;
  margin-left: 60px;
`;

export const LoginFormWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 400px;
  margin: 1rem auto;
  padding: 60px 68px 40px;
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

export const FormInput = styled.input`
  background: #333;
  outline: none;
  border: 0;
  border-radius: 4px;
  color: #fff;
  padding: 15px;
  width: 100%;
  margin-bottom: 0.5rem;
`;

export const FormInputSubmit = styled(FormInput)`
  ${({ theme }) => css`
    background: ${theme.colors.redColor};
    font-size: ${theme.fonts.size.mediumSize};
    font-weight: ${theme.fonts.weight.bold};
  `}
  margin: 1rem auto 4rem auto;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const SignUpNow = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.midGray};
  `}
`;

export const SignUpText = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.fonts.size.medium};
  `}
`;

export const SignUpLink = styled(Link)`
  ${({ theme }) => css`
    color: ${theme.colors.white};
  `}
  text-decoration: none;
`;
