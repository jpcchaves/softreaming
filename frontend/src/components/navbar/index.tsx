// icons
import { BsList, BsX } from 'react-icons/bs';
// styled
import {
  LeftContainer,
  Logo,
  NavbarContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLink,
  NavbarLinkContainer,
  RightContainer,
  OpenLinksButton,
  NavbarLinkExtended,
  NavProfileImgWrapper,
  NavProfileImg,
} from './style';
// logo
import LogoImage from '../../assets/logo/logo.png';
// hooks
import { useState, useContext, useEffect } from 'react';
// context
import { AuthContext } from '../../contexts/auth/AuthContext';
import { Outlet, useNavigate } from 'react-router-dom';
import { Profiles } from '../../types/Profiles';

const Navbar = () => {
  const auth = useContext(AuthContext);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { id } = auth.user!;
  const navigate = useNavigate();
  const [extendNavbar, setExtendNavbar] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<Profiles>();

  useEffect(() => {
    const profile = JSON.parse(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      localStorage.getItem('loggedProfile')!
    ) as Profiles;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setCurrentProfile(profile!);
  }, []);

  const handleExtendNavbar = () => {
    setExtendNavbar((curr) => !curr);
  };

  const handleLogout = async () => {
    await auth.signout();
    navigate('/');
  };

  const logoNavigation = () => {
    navigate('/br');
  };

  return (
    <>
      <NavbarContainer extendNavbar={extendNavbar}>
        <NavbarInnerContainer>
          <LeftContainer>
            <NavbarLinkContainer>
              <Logo
                src={LogoImage}
                alt="logotipo da softreaming"
                onClick={logoNavigation}
              />
              <NavbarLink to="/br/movies">Movies</NavbarLink>
            </NavbarLinkContainer>
          </LeftContainer>
          <RightContainer>
            <NavbarLinkContainer>
              {auth.user?.role === 'admin' && (
                <NavbarLink to="/br/add-movie">Add Movies</NavbarLink>
              )}
              <NavbarLink to="/profiles">Profiles</NavbarLink>
              <NavbarLink to={`/br/user/${id}`}>
                {currentProfile?.profileName}
              </NavbarLink>
              <NavbarLink to="#">
                <NavProfileImgWrapper>
                  <NavProfileImg
                    src={currentProfile?.profileUrlImage}
                    alt="imagem do perfil logado"
                  />
                </NavProfileImgWrapper>
              </NavbarLink>
              <NavbarLink to="" onClick={handleLogout}>
                Sair
              </NavbarLink>
              <OpenLinksButton onClick={handleExtendNavbar}>
                {extendNavbar ? <BsX /> : <BsList />}
              </OpenLinksButton>
            </NavbarLinkContainer>
          </RightContainer>
        </NavbarInnerContainer>
        {extendNavbar && (
          <NavbarExtendedContainer>
            {auth.user?.role === 'admin' && (
              <NavbarLinkExtended
                to="/br/add-movie"
                onClick={handleExtendNavbar}
              >
                Add Movies
              </NavbarLinkExtended>
            )}
            <NavbarLinkExtended to="/br/movies" onClick={handleExtendNavbar}>
              Movies
            </NavbarLinkExtended>
            <NavbarLinkExtended to="/profiles" onClick={handleExtendNavbar}>
              Profiles
            </NavbarLinkExtended>
            <NavbarLinkExtended
              to={`/br/user/${id}`}
              onClick={handleExtendNavbar}
            >
              {currentProfile?.profileName}
            </NavbarLinkExtended>
            <NavbarLinkExtended to="" onClick={handleLogout}>
              Sair
            </NavbarLinkExtended>
          </NavbarExtendedContainer>
        )}
      </NavbarContainer>
      <Outlet />
    </>
  );
};

export default Navbar;
