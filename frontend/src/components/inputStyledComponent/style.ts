import styled, { css } from "styled-components";

export const FormInputWrapper = styled.div`
    width: 100%;
`

export const FormInput = styled.input`
  background: #333;
  outline: none;
  border: 0;
  border-radius: 5px; 
  color: #fff;
  padding: 15px;
  font-size: 1em;
  width: 100%;
  margin-bottom: 0.5rem;

  &:focus{
    border: 1px solid #ccc;
  }
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
