// hooks
import { useContext, useEffect } from 'react';
// router
import { Routes, Route, useNavigate } from 'react-router-dom';
// pages
import EnterPage from './pages/authentication/homePage';
import LoginPage from './pages/authentication/loginPage';
import SignUpPage from './pages/authentication/signUp';
// styled components
import { GlobalStyles } from './styles/global-styles';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
// context
import { RequireAuth, RequireAuthAndAdmin } from './contexts/auth/RequireAuth';
import { AuthContext } from './contexts/auth/AuthContext';
// pages
import ProfilesPage from './pages/authentication/profilesPage';
import ManageProfiles from './pages/authentication/manageProfiles';
import CreateProfile from './pages/authentication/createProfile';
import EditProfile from './pages/authentication/editProfile';
import MoviesPage from './pages/movies/moviesPage';
import MovieHomePage from './pages/movies/movieHomePage';
import UserDetails from './pages/user/editUser';
import AddMovie from './pages/movies/addMovie';
import WatchMovie from './pages/movies/watchMovie';
// components
import Navbar from './components/navbar';
import EditMovie from './pages/movies/editMovie';

const App: React.FC = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      navigate('/profiles');
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
          <Route
            path="/profiles/create"
            element={
              <RequireAuth>
                <CreateProfile />
              </RequireAuth>
            }
          />
          <Route
            path="/profiles/edit/:profileId"
            element={
              <RequireAuth>
                <EditProfile />
              </RequireAuth>
            }
          />
          <Route
            path="/profiles/manage-profiles"
            element={
              <RequireAuth>
                <ManageProfiles />
              </RequireAuth>
            }
          />
          <Route
            path="/br"
            element={
              <RequireAuth>
                <Navbar />
              </RequireAuth>
            }
          >
            <Route
              index
              element={
                <RequireAuth>
                  <MovieHomePage />
                </RequireAuth>
              }
            />
            <Route
              path="movies"
              element={
                <RequireAuth>
                  <MoviesPage />
                </RequireAuth>
              }
            />
            <Route
              path="user/:idUser"
              element={
                <RequireAuth>
                  <UserDetails />
                </RequireAuth>
              }
            />
            <Route
              path="movie/:movieId"
              element={
                <RequireAuth>
                  <EditMovie />
                </RequireAuth>
              }
            />
            <Route
              path="watch/:movieId"
              element={
                <RequireAuth>
                  <WatchMovie />
                </RequireAuth>
              }
            />
            <Route
              path="add-movie"
              element={
                <RequireAuthAndAdmin>
                  <AddMovie />
                </RequireAuthAndAdmin>
              }
            />
          </Route>
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </ThemeProvider>
      <GlobalStyles />
    </>
  );
};

export default App;
