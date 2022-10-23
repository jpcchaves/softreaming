import { Link } from "react-router-dom";
import styled from "styled-components";

export const ManageProfilesPageContainer = styled.div`
  width: 100vw;
  max-width: 100%;
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
  margin-top: 1rem;
  flex-basis: calc(100vh - 30%);
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
  padding: 0px 50px;
`;

export const ErrorMessagePageWrapper = styled.div`
  width: 50%;
  margin: 0 auto;
`;

export const GoBackLinkWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const GoBackLink = styled(Link)`
  color: ${({ theme }) => theme.colors.smokeWhite};
  font-size: ${({ theme }) => theme.fonts.size.bigSize2};
  text-decoration: none;
  transition: 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;
