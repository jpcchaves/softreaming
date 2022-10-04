import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/auth/AuthContext";
// styled
import {
  Logo,
  LogoContainer,
  LogoWrapper,
  ManageProfilesButton,
  ManageProfilesButtonWrapper,
  ProfileBanner,
  ProfileImage,
  ProfileImageWrapper,
  ProfileName,
  ProfilesButtonText,
  ProfilesContainer,
  ProfilesPageWrapper,
  ProfilesTitle,
  ProfilesTitleContainer,
  ProfilesWrapper,
} from "./style";
// Logo
import LogoImage from "../../../assets/logo/logo.png";

const ProfilesPage: React.FC = () => {
  const auth = useContext(AuthContext);

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
          <ProfileBanner>
            <ProfileImageWrapper>
              <ProfileImage src="https://i.pinimg.com/originals/61/54/76/61547625e01d8daf941aae3ffb37f653.png" />
              <ProfileName>Profile Name</ProfileName>
            </ProfileImageWrapper>
          </ProfileBanner>
          <ProfileBanner>
            <ProfileImageWrapper>
              <ProfileImage src="https://i.pinimg.com/originals/61/54/76/61547625e01d8daf941aae3ffb37f653.png" />
              <ProfileName>Profile Name</ProfileName>
            </ProfileImageWrapper>
          </ProfileBanner>
          <ProfileBanner>
            <ProfileImageWrapper>
              <ProfileImage src="https://i.pinimg.com/originals/61/54/76/61547625e01d8daf941aae3ffb37f653.png" />
              <ProfileName>Profile Name</ProfileName>
            </ProfileImageWrapper>
          </ProfileBanner>
          <ProfileBanner>
            <ProfileImageWrapper>
              <ProfileImage src="https://i.pinimg.com/originals/61/54/76/61547625e01d8daf941aae3ffb37f653.png" />
              <ProfileName>Profile Name</ProfileName>
            </ProfileImageWrapper>
          </ProfileBanner>
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
