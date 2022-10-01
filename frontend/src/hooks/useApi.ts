import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const useApi = () => ({
  validateToken: async (id: number, token: string) => {
    
  },
  signin: async (email: string, password: string) => {
    const userLoginData = {email, password}
    const response = await api.post("/login", userLoginData);
    return response.data;
  },
  signout: async () => {
    const response = await api.post("/logout");
    return response.data;
  },
});
