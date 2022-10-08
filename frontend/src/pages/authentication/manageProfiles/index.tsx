import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import { api } from "../../../hooks/useApi";
import { UserProfiles } from "../../../types/Profiles";
import {
  GoBackLink,
  GoBackLinkWrapper,
  ManageProfilesContainer,
  ManageProfilesDashboardWrapper,
  ManageProfilesPageContainer,
  ManageProfilesSubtitle,
  ManageProfilesTitle,
  ManageProfilesTitleContainer,
  ProfilesWrapper,
} from "./style";
// icons
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import ManageProfileBanner from "../../../components/manageProfileBanner";
import LoadingSpan from "../../../components/loadingSpan";
import ErrorMessageComponent from "../../../components/errorMessage";

const ManageProfiles: React.FC = () => {
  const [userProfiles, setUserProfiles] = useState<UserProfiles>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const auth = useContext(AuthContext);
  
  const { id } = auth.user!;

  const getToken = () => {
    const token = localStorage.getItem("authToken");
    return token;
  };

  useEffect(() => {
    const getUserProfiles = async () => {
      if (!auth.user) return <Navigate to="/login" />;

      try {
        setIsLoading(true);

        const authToken = getToken();

        const userProfiles = await api.get(`/user/${id}/profiles`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const { profiles } = userProfiles.data;
        setUserProfiles(profiles);

        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(true);

        setError(true);

        setErrorMessage(
          "Ocorreu um erro ao carregar os perfis, tente novamente!"
        );
        setIsLoading(false);
      }
    };
    getUserProfiles();
  }, []);

  return (
    <ManageProfilesPageContainer>
      <ManageProfilesDashboardWrapper>
        <ManageProfilesTitleContainer>
          <ManageProfilesTitle>Perfis</ManageProfilesTitle>
          <ManageProfilesSubtitle>
            Gerencie os seus perfis
          </ManageProfilesSubtitle>
        </ManageProfilesTitleContainer>
        <ManageProfilesContainer>
          {isLoading && <LoadingSpan />}
          {error && <ErrorMessageComponent errorMessage={errorMessage} />}
          <ProfilesWrapper>
            {!isLoading &&
              userProfiles &&
              userProfiles.map((profile) => (
                <ManageProfileBanner
                  key={profile.id}
                  id={profile.id}
                  profileName={profile.profileName}
                  profileUrlImage={profile.profileUrlImage}
                />
              ))}
            <GoBackLinkWrapper>
              <GoBackLink to="/profiles">
                <BsFillArrowLeftCircleFill />
              </GoBackLink>
            </GoBackLinkWrapper>
          </ProfilesWrapper>
        </ManageProfilesContainer>
      </ManageProfilesDashboardWrapper>
    </ManageProfilesPageContainer>
  );
};

export default ManageProfiles;
