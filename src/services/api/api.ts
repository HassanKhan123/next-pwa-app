import { Dispatch, SetStateAction } from "react";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// export const postMessage = async (message: string) => {
//   try {
//     const payload = { message };
//     const response = await axios.post(`${BACKEND_URL}/search/chat`, payload);
//     console.log(response.data.content);
//     return response.data;
//   } catch (error) {
//     console.error("Error while posting the message:", error);
//     throw error;
//   }
// };

export const postMessage = async (
  message: string,
  onContentReceived: (content: string) => void,
  onParsedChunkReceived: (parsedChunk: any) => void,
) => {
  try {
    const response = await fetch(`${BACKEND_URL}/search/chat`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: message,
      }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    let isFirstChunk = true;
    let result = "";

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        if (isFirstChunk) {
          const ParsedChunk = JSON.parse(chunk);
          isFirstChunk = false;
          onParsedChunkReceived(ParsedChunk);
        } else {
          result += chunk;

          const contentMatches = result.match(/"content":\s*"([^"]+)"/g);
          if (contentMatches && contentMatches.length > 0) {
            const concatenatedContent = contentMatches
              .map((match) => match.match(/"content":\s*"([^"]+)"/)?.[1])
              .filter(Boolean)
              .join("");

            onContentReceived(concatenatedContent);

            result = "";
          } else {
            console.log("Content not found in this chunk");
          }
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
