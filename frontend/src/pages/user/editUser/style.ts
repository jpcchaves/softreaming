import styled, { css } from 'styled-components';

export const UserDetailsPageWrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 80px);
  color: white;
  padding: 50px 0;
`;

export const EditFormWrapper = styled.div`
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

export const EditForm = styled.form`
  width: 100%;
`;
