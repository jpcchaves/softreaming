import { GlobalStyles } from "./styles/global-styles";
// router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EnterPage from "./pages/homePage";
import AuthPage from "./pages/authPage";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<EnterPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
        <GlobalStyles />
      </Router>
    </>
  );
};

export default App;
