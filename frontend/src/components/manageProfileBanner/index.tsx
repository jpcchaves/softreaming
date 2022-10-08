// hooks
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// auth context
import { AuthContext } from "../../contexts/auth/AuthContext";
import { api } from "../../hooks/useApi";
// types
import { Profiles } from "../../types/Profiles";
// styled
import {
  ButtonsWrapper,
  DeleteButton,
  EditButton,
  ProfileBanner,
  ProfileImage,
  ProfileImageWrapper,
  ProfileName,
  ProfileNameWrapper,
} from "./style";

const ManageProfileBanner = ({
  id,
  profileName,
  profileUrlImage,
}: Profiles) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDeleteProfile = async (id?: number) => {
    if (!auth.user) return <Navigate to="/login" />;

    const profileIdToDelete = id;

    const getToken = () => {
      const token = localStorage.getItem("authToken");
      return token;
    };

    try {
      const authToken = getToken();
      const { id } = auth.user!;

      await api.delete(`/profiles/${id}/${profileIdToDelete}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      navigate("/profiles");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProfileBanner key={id}>
      <ProfileImageWrapper>
        <ProfileImage src={profileUrlImage} />
      </ProfileImageWrapper>
      <ProfileNameWrapper>
        <ProfileName>{profileName}</ProfileName>
      </ProfileNameWrapper>
      <ButtonsWrapper>
        <EditButton to="">Editar</EditButton>
        <DeleteButton onClick={() => handleDeleteProfile(id)}>
          Excluir
        </DeleteButton>
      </ButtonsWrapper>
    </ProfileBanner>
  );
};

export default ManageProfileBanner;
