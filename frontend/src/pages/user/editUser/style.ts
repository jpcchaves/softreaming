import styled, { css } from "styled-components";

export const UserDetailsPageWrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 80px);
  color: white;
`;

<<<<<<< HEAD
export const EditFormWrapper = styled.div`
=======
export const LoginFormWrapper = styled.div`
>>>>>>> 1aef47ebc1c087731b60db5e32ed541d369bc5e3
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

<<<<<<< HEAD
export const EditForm = styled.form`
=======
export const LoginForm = styled.form`
>>>>>>> 1aef47ebc1c087731b60db5e32ed541d369bc5e3
  width: 100%;
`;
