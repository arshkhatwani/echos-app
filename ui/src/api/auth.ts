import axios from "axios";
import { API_CONFIG } from "../config/constants";

interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
}

export const auth = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await axios.post<LoginResponse>(
      `${API_CONFIG.SERVER_URL}${API_CONFIG.LOGIN_ENDPOINT}`,
      credentials,
    );
    return response.data;
  },
};
