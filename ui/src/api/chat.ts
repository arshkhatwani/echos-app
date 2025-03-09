import axios from "axios";
import { API_CONFIG } from "../config/constants";

export interface SearchUserResponse {
  username: string;
  user_id: string;
}

export interface AddUserResponse {
  message: string;
  user_id: string;
  username: string;
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
  async getChatLibrary(accessToken: string): Promise<SearchUserResponse[]> {
    const response = await axios.get<SearchUserResponse[]>(
      `${API_CONFIG.SERVER_URL}${API_CONFIG.GET_CHAT_LIBRARY_ENDPOINT}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  },
  async addUserInChatLibrary(
    userId: string,
    accessToken: string,
  ): Promise<AddUserResponse> {
    const response = await axios.post<AddUserResponse>(
      `${API_CONFIG.SERVER_URL}${API_CONFIG.ADD_USER_IN_CHAT_LIBRARY_ENDPOINT}`,
      {
        id: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  },
};
