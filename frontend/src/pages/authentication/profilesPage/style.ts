import { Link } from "react-router-dom";
import styled from "styled-components";

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
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 50px;
  flex-wrap: wrap;
  width: 100%;
`;

export const AddProfileButtonWrapper = styled.div`
  width: 200px;
  height: 253px;
  cursor: pointer;
`;

export const AddProfileImageWrapper = styled.div`
  width: 100%;
  height: calc(253px - 53px);
`;

export const AddProfileImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const AddProfileTextWrapper = styled.div`
  height: 53px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const AddProfileText = styled.p`
  color: ${({ theme }) => theme.colors.midGray};
  font-size: ${({ theme }) => theme.fonts.size.mediumBigSize};
  margin: 0.5rem 0;
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

export const ProfilesNotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ProfileNotFoundText = styled.p`
  font-size: 26px;
  color: #721c24;
`;

export const CreateProfile = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.midGray};
  font-size: ${({ theme }) => theme.fonts.size.mediumBigSize};
  margin-top: 2rem;
  border: 1px solid #6d6d6e;
  padding: 10px;
  border-radius: 5px;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.midGray};
    color: #000;
  }
`;

export const ManageProfilesButtonWrapper = styled.div`
  width: 100%;
  padding: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ManageProfilesButton = styled(Link)`
  background-color: transparent;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  border: 1px solid #6d6d6e;
  padding: 10px 5px;
  border-radius: 5px;
  width: 400px;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.midGray};
  }
`;

export const ProfilesButtonText = styled.span`
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fonts.size.mediumBigSize};
  color: ${({ theme }) => theme.colors.midGray};
  display: inline-block;
  width: 100%;
  height: 100%;

  &:hover {
    color: #000;
  }
`;
