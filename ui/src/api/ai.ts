import axios from "axios";
import { API_CONFIG } from "../config/constants";

export interface ReplySuggestionsResponse {
  reply: string[];
}

export interface MessageCompositionResponse {
  message: string;
}

export interface TextCompletionResponse {
  completion: string;
}

export interface RephraseResponse {
  rephrase: string;
}

export interface SummarizationResponse {
  summary: string;
}

export interface OneWordRepliesResponse {
  one_word_replies: string[];
}

export const ai = {
  async getReplySuggestions(
    message: string,
    accessToken: string,
  ): Promise<ReplySuggestionsResponse> {
    const response = await axios.post<ReplySuggestionsResponse>(
      `${API_CONFIG.SERVER_URL}${API_CONFIG.REPLY_SUGGESTIONS_ENDPOINT}`,
      {
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  },
  async getMessageComposition(
    message: string,
    accessToken: string,
  ): Promise<MessageCompositionResponse> {
    const response = await axios.post<MessageCompositionResponse>(
      `${API_CONFIG.SERVER_URL}${API_CONFIG.MESSAGE_COMPOSITION_ENDPOINT}`,
      {
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  },
  async getTextCompletion(
    message: string,
    accessToken: string,
  ): Promise<TextCompletionResponse> {
    const response = await axios.post<TextCompletionResponse>(
      `${API_CONFIG.SERVER_URL}${API_CONFIG.TEXT_COMPLETION_ENDPOINT}`,
      {
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  },
  async getRephrase(
    message: string,
    accessToken: string,
  ): Promise<RephraseResponse> {
    const response = await axios.post<RephraseResponse>(
      `${API_CONFIG.SERVER_URL}${API_CONFIG.REPHRASE_ENDPOINT}`,
      {
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  },
  async getSummarization(
    message: string,
    accessToken: string,
  ): Promise<SummarizationResponse> {
    const response = await axios.post<SummarizationResponse>(
      `${API_CONFIG.SERVER_URL}${API_CONFIG.SUMMARIZATION_ENDPOINT}`,
      {
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  },
  async getOneWordReplies(
    message: string,
    accessToken: string,
  ): Promise<OneWordRepliesResponse> {
    const response = await axios.post<OneWordRepliesResponse>(
      `${API_CONFIG.SERVER_URL}${API_CONFIG.ONE_WORD_REPLIES_ENDPOINT}`,
      {
        message,
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
