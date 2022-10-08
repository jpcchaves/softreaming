import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import { api } from "../../../hooks/useApi";
import { UserProfiles } from "../../../types/Profiles";
import {
  ButtonsWrapper,
  DeleteButton,
  EditButton,
  ManageProfilesContainer,
  ManageProfilesDashboardWrapper,
  ManageProfilesPageContainer,
  ManageProfilesSubtitle,
  ManageProfilesTitle,
  ManageProfilesTitleContainer,
  ProfileBanner,
  ProfileImage,
  ProfileImageWrapper,
  ProfileName,
  ProfileNameWrapper,
  ProfilesWrapper,
} from "./style";

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
          <ProfilesWrapper>
            <ProfileBanner>
              <ProfileImageWrapper>
                <ProfileImage src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" />
              </ProfileImageWrapper>
              <ProfileNameWrapper>
                <ProfileName>Profile Name</ProfileName>
              </ProfileNameWrapper>
              <ButtonsWrapper>
                <EditButton to="">Editar</EditButton>
                <DeleteButton to="">Excluir</DeleteButton>
              </ButtonsWrapper>
            </ProfileBanner>
          </ProfilesWrapper>
        </ManageProfilesContainer>
      </ManageProfilesDashboardWrapper>
    </ManageProfilesPageContainer>
  );
};

export default ManageProfiles;
