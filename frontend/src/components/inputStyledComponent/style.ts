import { MdAddPhotoAlternate } from 'react-icons/md';
import styled, { css } from 'styled-components';

export const FormInputWrapper = styled.div`
  width: 100%;
`;

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

  &:focus {
    border: 1px solid #ccc;
  }
`;

export const FormInputFile = styled.input.attrs({
  type: 'file',
})`
  display: none;
`;

export const FormInputFileLabel = styled.label`
  display: flex;
  padding: 10px 5px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  background: #333;
  color: #fff;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: 0.5s;
  border: 1px solid #333;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  gap: 5px;
  text-overflow: ellipsis;
  overflow: hidden;

  &:hover {
    color: #333;
    background-color: #fff;
  }
`;

export const AddPhotoIcon = styled(MdAddPhotoAlternate)`
  font-size: 30px;
  width: 32px;
  min-width: 32px;
  height: 32px;
  min-height: 32px;
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
