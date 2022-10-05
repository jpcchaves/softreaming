import { Profiles } from "../../types/Profiles";
import {
  ProfileBanner,
  ProfileImage,
  ProfileImageWrapper,
  ProfileName,
} from "./style";

const ProfileBannerComponent = ({
  id,
  profileName,
  profileUrlImage,
}: Profiles) => {
  return (
    <ProfileBanner key={id}>
      <ProfileImageWrapper>
        <ProfileImage src={profileUrlImage} />
        <ProfileName>{profileName}</ProfileName>
      </ProfileImageWrapper>
    </ProfileBanner>
  );
};

export default ProfileBannerComponent;
