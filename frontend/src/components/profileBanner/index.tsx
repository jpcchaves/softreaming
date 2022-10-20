import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const profileToStore = { id, profileName, profileUrlImage };

  const navigateToMovies = () => {
    localStorage.setItem("loggedProfile", JSON.stringify(profileToStore));
    navigate("/br");
  };

  return (
    <ProfileBanner key={id} onClick={navigateToMovies}>
      <ProfileImageWrapper>
        <ProfileImage src={profileUrlImage} />
        <ProfileName>{profileName}</ProfileName>
      </ProfileImageWrapper>
    </ProfileBanner>
  );
};

export default ProfileBannerComponent;
