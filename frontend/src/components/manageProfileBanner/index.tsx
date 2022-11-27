// icons
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
// hooks
import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
// auth context
import { AuthContext } from '../../contexts/auth/AuthContext';
import { api } from '../../hooks/useApi';
// types
import { Profiles } from '../../types/Profiles';
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
} from './style';

const ManageProfileBanner = ({
  id,
  profileName,
  profileUrlImage,
}: Profiles) => {
  const auth = useContext(AuthContext);

  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [profileIdToEdit, setProfileIdToEdit] = useState<number>(id!);

  const handleEditProfile = (id?: number) => {
    if (id) {
      setProfileIdToEdit(id);
    }

    navigate(`/profiles/edit/${profileIdToEdit}`);
  };

  const handleDeleteProfile = async (id?: number) => {
    if (!auth.user) return <Navigate to="/login" />;

    const profileIdToDelete = id;

    const getToken = () => {
      const token = localStorage.getItem('authToken');
      return token;
    };

    try {
      const authToken = getToken();
			
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { id } = auth.user!;

      await api.delete(`/profiles/${id}/${profileIdToDelete}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      navigate('/profiles');
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
        <EditButton onClick={() => handleEditProfile(id)}>
          <BsFillPencilFill />
        </EditButton>
        <DeleteButton onClick={() => handleDeleteProfile(id)}>
          <BsFillTrashFill />
        </DeleteButton>
      </ButtonsWrapper>
    </ProfileBanner>
  );
};

export default ManageProfileBanner;
