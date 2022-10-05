import styled, { ThemeContext } from "styled-components";

export const ProfilesPageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const LogoContainer = styled.div`
  height: 85px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const LogoWrapper = styled.div``;

export const Logo = styled.img`
  height: 2.8125rem;
  width: 10.4375rem;
  margin-left: 60px;
`;

export const ProfilesContainer = styled.div`
  width: 100%;
  padding: 0 50px;
  height: calc(100vh - 85px);
  display: flex;
  flex-direction: column;
`;

export const ProfilesTitleContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin: 4rem 0 2rem 0;
`;

export const ProfilesTitle = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  font-size: ${({ theme }) => theme.fonts.size.extraBig};
  text-shadow: 1px 1px 1px black;
`;

export const ProfilesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  flex-wrap: wrap;
  width: 100%;
`;

export const TextToCreateProfile = styled(ProfilesTitle)`
  font-size: ${({ theme }) => theme.fonts.size.bigSize2};
`;

export const ProfilesNotFound = styled.div`
  width: 50%;
  padding: 10px;
  background-color: #f8d7da;
  text-align: center;
  border-radius: 5px;
`;

export const ProfileNotFoundText = styled.p`
  font-size: 26px;
  color: #721c24;
`;

export const ManageProfilesButtonWrapper = styled.div`
  width: 100%;
  padding: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ManageProfilesButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: 1px solid #6d6d6e;
  padding: 10px 5px;
  border-radius: 5px;
  width: 400px;
`;

export const ProfilesButtonText = styled.span`
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fonts.size.mediumBigSize};
  color: ${({ theme }) => theme.colors.midGray};
`;
