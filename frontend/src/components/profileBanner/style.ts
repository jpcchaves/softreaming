import styled from 'styled-components';

export const ProfileBanner = styled.div`
  width: 200px;
  height: 253px;
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  transition: 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

export const ProfileImageWrapper = styled.div`
  width: 100%;
  min-width: 200px;
  height: 200px;
`;

export const ProfileImage = styled.img`
  width: 100%;
  max-width: 200px;
  height: 100%;
  object-fit: cover;
`;

export const ProfileName = styled.p`
  color: ${({ theme }) => theme.colors.midGray};
  font-size: ${({ theme }) => theme.fonts.size.mediumBigSize};
  margin: 0.5rem 0;
`;
