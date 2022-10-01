import { GlobalStyles } from "./styles/global-styles";
// router
import { Routes, Route } from "react-router-dom";
// pages
import EnterPage from "./pages/authentication/homePage";
import LoginPage from "./pages/authentication/loginPage";
import SignUpPage from "./pages/authentication/signUp";
// styled components
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import ProfilesPage from "./pages/authentication/profilesPage";
import { RequireAuth } from "./contexts/auth/RequireAuth";

const App: React.FC = () => {
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
