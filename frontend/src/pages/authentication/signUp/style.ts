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
  margin: 1rem auto;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const SubmitButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  padding: 5px;
  cursor: not-allowed;
`;

export const SubmitButtonDisabled = styled.button`
  ${({ theme }) => css`
    background-color: transparent;
    border: none;
    color: white;
    font-size: ${theme.fonts.size.mediumSize};
    font-weight: ${theme.fonts.weight.bold};
  `}
  cursor: not-allowed;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const LoadingMessage = styled.p``;

export const LoaderSpan = styled.div`
  transform: rotateZ(45deg);
  perspective: 1000px;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  color: #fff;

  &:before,
  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    transform: rotateX(70deg);
    animation: 1s spin linear infinite;
  }
  &:after {
    color: #ff3d00;
    transform: rotateY(70deg);
    animation-delay: 0.4s;
  }

  @keyframes rotate {
    0% {
      transform: translate(-50%, -50%) rotateZ(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotateZ(360deg);
    }
  }

  @keyframes rotateccw {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(-360deg);
    }
  }

  @keyframes spin {
    0%,
    100% {
      box-shadow: 0.2em 0px 0 0px currentcolor;
    }
    12% {
      box-shadow: 0.2em 0.2em 0 0 currentcolor;
    }
    25% {
      box-shadow: 0 0.2em 0 0px currentcolor;
    }
    37% {
      box-shadow: -0.2em 0.2em 0 0 currentcolor;
    }
    50% {
      box-shadow: -0.2em 0 0 0 currentcolor;
    }
    62% {
      box-shadow: -0.2em -0.2em 0 0 currentcolor;
    }
    75% {
      box-shadow: 0px -0.2em 0 0 currentcolor;
    }
    87% {
      box-shadow: 0.2em -0.2em 0 0 currentcolor;
    }
  }
`;

export const FormErrorMessageWrapper = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
`;

export const ErrorMessage = styled.p`
  color: #f8d7da;
  font-size: 14px;
`;
