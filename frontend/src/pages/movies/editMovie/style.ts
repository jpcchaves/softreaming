import styled, { css } from "styled-components";
import BgImg from "../../../assets/add_movie_bg/add_movie_bg.jpg";

export const EditMoviePageWrapper = styled.div`
  width: 100vw;
  max-width: 100%;
  min-height: calc(100vh - 80px);
  padding: 50px 0;
  background: rgba(0, 0, 0, 0.8) url(${BgImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-blend-mode: darken;
`;

export const EditMovieFormWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  min-height: 400px;
  max-width: 500px;
  padding: 40px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const FormTitle = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.white};
  `}
  margin-bottom: 28px;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fonts.size.bigSize1};
  }
`;

export const EditMovieForm = styled.form`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
`;
