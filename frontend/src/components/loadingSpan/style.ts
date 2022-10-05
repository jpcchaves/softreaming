import styled, { css } from "styled-components";

export const SubmitButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
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