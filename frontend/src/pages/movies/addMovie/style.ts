import styled, { css } from "styled-components";

export const AddMoviePageWrapper = styled.div`
  width: 100vw;
  max-width: 100%;
  min-height: calc(100vh - 80px);
  padding-bottom: 50px;
`;

export const AddMovieFormWrapper = styled.div`
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
`;

export const AddMovieForm = styled.form`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
`;
