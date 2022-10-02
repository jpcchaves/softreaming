import { GlobalStyles } from "./styles/global-styles";
// router
import { Routes, Route, useNavigate } from "react-router-dom";
// pages
import EnterPage from "./pages/authentication/homePage";
import LoginPage from "./pages/authentication/loginPage";
import SignUpPage from "./pages/authentication/signUp";
// styled components
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import ProfilesPage from "./pages/authentication/profilesPage";
import { RequireAuth } from "./contexts/auth/RequireAuth";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/auth/AuthContext";

const App: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const hasUser = auth.user;
    if (hasUser) {
      navigate("/profiles");
      return () => {};
    }
  }, [auth.user]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<EnterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          {/* private routes */}
          <Route
            path="/profiles"
            element={
              <RequireAuth>
                <ProfilesPage />
              </RequireAuth>
            }
          />
        </Routes>
      </ThemeProvider>
      <GlobalStyles />
    </>
  );
};

export default App;
