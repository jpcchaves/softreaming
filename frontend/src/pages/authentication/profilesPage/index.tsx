import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/auth/AuthContext";
// styled
import {
  Logo,
  LogoContainer,
  LogoWrapper,
  ManageProfilesButton,
  ManageProfilesButtonWrapper,
  ProfileNotFoundText,
  ProfilesButtonText,
  ProfilesContainer,
  ProfilesNotFound,
  ProfilesPageWrapper,
  ProfilesTitle,
  ProfilesTitleContainer,
  ProfilesWrapper,
  TextToCreateProfile,
} from "./style";
// types
import { UserProfiles } from "../../../types/Profiles";
// Logo
import LogoImage from "../../../assets/logo/logo.png";
import { api } from "../../../hooks/useApi";
import { Navigate } from "react-router-dom";
// components
import LoadingSpan from "../../../components/loadingSpan";
import ProfileBannerComponent from "../../../components/profileBanner";
import ErrorMessageComponent from "../../../components/errorMessage";

const ProfilesPage: React.FC = () => {
  const auth = useContext(AuthContext);
  const [userProfiles, setUserProfiles] = useState<UserProfiles>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    <ProfilesPageWrapper>
      <LogoContainer>
        <LogoWrapper>
          <Logo src={LogoImage} alt="logotipo da softreaming" />
        </LogoWrapper>
      </LogoContainer>
      <ProfilesContainer>
        <ProfilesTitleContainer>
          <ProfilesTitle>Quem está assistindo?</ProfilesTitle>
        </ProfilesTitleContainer>
        <ProfilesWrapper>
          {isLoading && <LoadingSpan />}
          {error && (
            <ProfilesNotFound>
              <ProfileNotFoundText>{errorMessage}</ProfileNotFoundText>
            </ProfilesNotFound>
          )}
          {!error && userProfiles?.length === 0 && (
            <TextToCreateProfile>
              Nenhum perfil cadastrado ainda. Clique em gerenciar perfis e crie
              um agora!
            </TextToCreateProfile>
          )}
          {!isLoading &&
            userProfiles &&
            userProfiles.map((profile) => (
              <ProfileBannerComponent
                id={profile.id}
                profileName={profile.profileName}
                profileUrlImage={profile.profileUrlImage}
              ></ProfileBannerComponent>
            ))}
        </ProfilesWrapper>
        <ManageProfilesButtonWrapper>
          <ManageProfilesButton>
            <ProfilesButtonText>Gerenciar perfis</ProfilesButtonText>
          </ManageProfilesButton>
        </ManageProfilesButtonWrapper>
      </ProfilesContainer>
    </ProfilesPageWrapper>
  );
};

export default ProfilesPage;
