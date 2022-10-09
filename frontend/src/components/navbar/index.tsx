// icons
import { BsList, BsX } from "react-icons/bs";
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
} from "./style";
// logo
import LogoImage from "../../assets/logo/logo.png";
// hooks
import { useState, useContext } from "react";
// context
import { AuthContext } from "../../contexts/auth/AuthContext";
import { Outlet, useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [extendNavbar, setExtendNavbar] = useState(false);

  const handleExtendNavbar = () => {
    setExtendNavbar((curr) => !curr);
  };

  const handleLogout = async () => {
    await auth.signout();
    navigate("/");
  };

  const logoNavigation = () => {
    navigate("/br");
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
              <NavbarLink to="/br/user">{auth.user?.userName}</NavbarLink>
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
            <NavbarLinkExtended to="/br/movies" onClick={handleExtendNavbar}>
              Movies
            </NavbarLinkExtended>
            <NavbarLinkExtended to="/br/user" onClick={handleExtendNavbar}>
              {auth.user?.userName}
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
