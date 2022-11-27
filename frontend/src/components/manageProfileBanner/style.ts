import styled from 'styled-components';

export const ProfileBanner = styled.div`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
`;

export const ProfileImageWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export const ProfileImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

export const ProfileNameWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

export const ProfileName = styled.p`
  color: ${({ theme }) => theme.colors.midGray};
  font-size: ${({ theme }) => theme.fonts.size.mediumBigSize};
  margin: 0.5rem 0 1rem 0;
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const EditButton = styled.button`
  text-decoration: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.midGray};
  font-size: ${({ theme }) => theme.fonts.size.mediumSize};
  font-family: ${({ theme }) => theme.fonts.family.default};
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  transition: 0.2s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.midGray};
    color: #000;
  }
`;

export const DeleteButton = styled.button`
  border: none;
  background-color: #f8d7da;
  cursor: pointer;
  color: #000;
  border-radius: 5px;
  color: #721c24;
  font-size: ${({ theme }) => theme.fonts.size.mediumSize};
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;
