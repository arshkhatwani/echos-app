import axios from "axios";
import { API_CONFIG } from "../config/constants";

export interface SearchUserResponse {
  username: string;
  user_id: string;
}

export const chat = {
  async searchUsers(
    search: string,
    accessToken: string,
  ): Promise<SearchUserResponse[]> {
    const response = await axios.get<SearchUserResponse[]>(
      `${API_CONFIG.SERVER_URL}${API_CONFIG.SEARCH_USERS_ENDPOINT}`,
      {
        params: {
          search,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  },
};
