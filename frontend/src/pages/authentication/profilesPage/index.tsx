import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/auth/AuthContext";
// styled
import { ProfilesPageWrapper } from "./style";

const ProfilesPage: React.FC = () => {

  const auth = useContext(AuthContext)

  return (
    <ProfilesPageWrapper style={{ color: "white", textAlign: 'center', marginTop: '10rem' } }>
      {auth.user?.email}    
      {auth.user?.id}    
      {auth.user?.userName}    
    </ProfilesPageWrapper>
  );
};

export default ProfilesPage;
