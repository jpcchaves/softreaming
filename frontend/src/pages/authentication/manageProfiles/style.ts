import { Link } from "react-router-dom";
import styled from "styled-components";

export const ManageProfilesPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;
// display flex
export const ManageProfilesDashboardWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;
// flex container
export const ManageProfilesTitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  flex-basis: 30%;
`;

export const ManageProfilesTitle = styled.h3`
  color: ${({ theme }) => theme.colors.white};
  text-shadow: 1px 1px 1px black;
  font-size: ${({ theme }) => theme.fonts.size.extraBig};
  margin-bottom: 0.5em;
`;

export const ManageProfilesSubtitle = styled.h4`
  color: ${({ theme }) => theme.colors.smokeWhite};
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  font-size: ${({ theme }) => theme.fonts.size.mediumBigSize};
`;
// flex container
export const ManageProfilesContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 3rem;
  flex-basis: calc(100vh - 30%);
  border: 2px solid white;
`;
// inside the flex container, we'll have small profile banners
export const ProfilesWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 70px;
  padding: 20px 50px 50px 50px;
`;

export const ProfileBanner = styled.div`
  width: 200px;
`;

export const ProfileImageWrapper = styled.div`
  width: 100%;
`;

export const ProfileImage = styled.img`
  width: 100%;
`;

export const ProfileNameWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

export const ProfileName = styled.p`
  color: ${({ theme }) => theme.colors.midGray};
  font-size: ${({ theme }) => theme.fonts.size.mediumBigSize};
  margin: 1rem 0;
`;

export const ButtonsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const EditButton = styled(Link)`
  text-decoration: none;
  background-color: #7be4a5;
  color: #000;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
`;

export const DeleteButton = styled(EditButton)`
  background-color: #f8d7da;
  color: #000;
`;
