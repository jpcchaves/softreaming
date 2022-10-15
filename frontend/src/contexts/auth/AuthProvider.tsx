// hooks
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
// type
import { User } from "../../types/User";
// context
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();

  useEffect(() => {
    const validateToken = async () => {
      const storagedData = localStorage.getItem("authToken");
      try {
        if (storagedData) {
          const loggedUserData = await api.validateToken(storagedData);
          if (loggedUserData) {
            setUser(loggedUserData.data);
          }
        }
      } catch (error: any) {
        if (error) {
          console.log(error.response.data);
        }
      }
    };
    validateToken();
  }, []);

  // signin
  const signin = async (email: string, password: string) => {
    const response = await api.signin(email, password);
    if (response.user && response.token) {
      setUser(response.user);
      setToken(response.token);
      return true;
    } else {
      return false;
    }
  };

  const signout = async () => {
    setUser(null);
    setToken("");
    await api.signout();
  };

  const setToken = (token: string) => {
    localStorage.setItem("authToken", token);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
