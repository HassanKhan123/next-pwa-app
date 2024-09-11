import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const postMessage = async (message: string) => {
    try {
      const payload = { message };
      const response = await axios.post(`${BACKEND_URL}/search/docs`, payload);
      return response.data;
    } catch (error) {
      console.error("Error while posting the message:", error);
      throw error;
    }
  };