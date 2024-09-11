import { useMutation } from "@tanstack/react-query";
import { postMessage } from "@/services/api/api";

export const usePostMessage = () => {
  return useMutation({
    mutationFn: postMessage,
    onSuccess: (data) => {
      console.log("Response from API:", data);
    },
    onError: (error) => {
      console.error("Error posting message:", error);
    },
  });
};
