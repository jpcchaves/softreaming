import React from "react";
// styled
import { ProfilesPageWrapper } from "./style";

const ProfilesPage: React.FC = () => {
  return (
    <ProfilesPageWrapper style={{ color: "white", textAlign: 'center', marginTop: '10rem' } }>
      ESSA PÁGINA É BLOQUEADA PARA USUÁRIOS NÃO AUTENTICADOS!!!!
    </ProfilesPageWrapper>
  );
};

export default ProfilesPage;
