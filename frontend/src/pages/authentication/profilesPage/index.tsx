import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/auth/AuthContext';
// styled
import {
  AddProfileButtonWrapper,
  AddProfileImage,
  AddProfileImageWrapper,
  AddProfileText,
  AddProfileTextWrapper,
  CreateProfile,
  Logo,
  LogoContainer,
  LogoWrapper,
  ManageProfilesButton,
  ManageProfilesButtonWrapper,
  ProfileNotFoundText,
  ProfilesButtonText,
  ProfilesContainer,
  ProfilesNotFound,
  ProfilesNotFoundWrapper,
  ProfilesPageWrapper,
  ProfilesTitle,
  ProfilesTitleContainer,
  ProfilesWrapper,
  TextToCreateProfile,
} from './style';
// types
import { UserProfiles } from '../../../types/Profiles';
// Logo
import LogoImage from '../../../assets/logo/logo.png';
// add img
import AddProfileImg from '../../../assets/add/Add.png';
import { api } from '../../../hooks/useApi';
import { Navigate, useNavigate } from 'react-router-dom';
// components
import LoadingSpan from '../../../components/loadingSpan';
import ProfileBannerComponent from '../../../components/profileBanner';

const ProfilesPage: React.FC = () => {
  const auth = useContext(AuthContext);
  const [userProfiles, setUserProfiles] = useState<UserProfiles>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { id } = auth.user!;

  const getToken = () => {
    const token = localStorage.getItem('authToken');
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setIsLoading(true);

        setError(true);

        setErrorMessage('Ocorreu um erro... Tente novamente mais tarde.');

        setTimeout(() => {
          setErrorMessage('');
          setError(false);
        }, 3000);

        setIsLoading(false);

        return;
      }
    };
    getUserProfiles();
  }, []);

  const handleClick = () => {
    navigate('/profiles/create');
  };

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
            <ProfilesNotFoundWrapper>
              <TextToCreateProfile>
                Nenhum perfil cadastrado ainda.
              </TextToCreateProfile>
              <CreateProfile to="/profiles/create">Criar Perfil</CreateProfile>
            </ProfilesNotFoundWrapper>
          )}
          {!error &&
            !isLoading &&
            userProfiles &&
            userProfiles.map((profile) => (
              <ProfileBannerComponent
                key={profile.id}
                profileName={profile.profileName}
                profileUrlImage={profile.profileUrlImage}
              />
            ))}
          {userProfiles &&
            userProfiles?.length >= 1 &&
            userProfiles?.length <= 3 && (
            <AddProfileButtonWrapper onClick={handleClick}>
              <AddProfileImageWrapper>
                <AddProfileImage src={AddProfileImg} />{' '}
              </AddProfileImageWrapper>
              <AddProfileTextWrapper>
                <AddProfileText>Adicionar Perfil</AddProfileText>
              </AddProfileTextWrapper>
            </AddProfileButtonWrapper>
          )}
        </ProfilesWrapper>
        {userProfiles && userProfiles?.length > 0 && (
          <ManageProfilesButtonWrapper>
            <ManageProfilesButton to="/profiles/manage-profiles">
              <ProfilesButtonText>Gerenciar Perfis</ProfilesButtonText>
            </ManageProfilesButton>
          </ManageProfilesButtonWrapper>
        )}
      </ProfilesContainer>
    </ProfilesPageWrapper>
  );
};

export default ProfilesPage;
