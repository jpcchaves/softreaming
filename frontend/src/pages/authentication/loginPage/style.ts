import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import BgImg from "../../../assets/bg_poster/netflix_poster.jpg";

export const EnterPageContainer = styled.header`
  height: 100vh;
  max-width: 100vw;
  background-image: url(${BgImg});
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

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const LogoLink = styled(Link)``;

export const Logo = styled.img`
  height: 2.8125rem;
  width: 10.4375rem;
  margin-left: 60px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
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

  @media (max-width: 768px) {
    margin: 4rem auto;
    padding: 30px 34px 20px;
  }
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
