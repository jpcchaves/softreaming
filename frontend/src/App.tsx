import { GlobalStyles } from "./styles/global-styles";
// router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// pages
import EnterPage from "./pages/homePage";
import AuthPage from "./pages/authPage";
import SignUpPage from "./pages/sign-up";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<EnterPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
        <GlobalStyles />
      </Router>
    </>
  );
};

export default App;
