import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const useApi = () => ({
  validateToken: async (token: string) => {
    const tokenToValidate = token;
    const userData = await api.get("/user", {
      headers: {
        Authorization: `Bearer ${tokenToValidate}`,
      },
    });
    return userData;
  },
  signin: async (email: string, password: string) => {
    const userLoginData = { email, password };
    const response = await api.post("/login", userLoginData);
    return response.data;
  },
  signout: async () => {
    return { status: true };
  },
});
