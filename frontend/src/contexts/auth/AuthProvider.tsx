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

      if (storagedData) {
        const loggedUserData = await api.validateToken(storagedData);
        if (loggedUserData) {
          setUser(loggedUserData.data);
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
    await api.signout();
    setUser(null);
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
