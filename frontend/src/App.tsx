import { GlobalStyles } from "./styles/global-styles";
// router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// pages
import EnterPage from "./pages/homePage";
import AuthPage from "./pages/authPage";
import SignUpPage from "./pages/sign-up";
// styled components
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<EnterPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </ThemeProvider>
        <GlobalStyles />
      </Router>
    </>
  );
};

export default App;
