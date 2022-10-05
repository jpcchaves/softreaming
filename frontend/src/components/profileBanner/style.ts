import styled from "styled-components";

export const ProfileBanner = styled.div`
  width: 200px;
  height: 253px;
  text-align: center;
  cursor: pointer;
`;

export const ProfileImageWrapper = styled.div`
  width: 100%;
  height: 200px;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const ProfileName = styled.p`
  color: ${({ theme }) => theme.colors.midGray};
  font-size: ${({ theme }) => theme.fonts.size.mediumBigSize};
  margin: 0.5rem 0;
`;
