// hooks
import { useState } from "react";
import { useApi } from "../../hooks/useApi";
// type
import { User } from "../../types/User";
// context
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  const api = useApi();

  // signin
  const signin = async (email: string, password: string) => {
    const response = await api.signin(email, password);
    if (response.user && response.token) {
      setUser(response);
      return true;
    } else {
      return false;
    }
  };

  const signout = async () => {
    await api.signout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
