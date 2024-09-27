import React from "react";
import InputWithVoice from "../input/voice";
import SuggestionCard from "../card/suggestion";
import { useRouter } from "next/navigation";
import { chatDataAtom, historyAtom, loadingAtom } from "@/atoms";
import { useAtom } from "jotai";
import { postMessage } from "@/services/api/api";

interface History {
  value: string;
  timestamp: string;
}

const suggestions = [
  {
    heading: "Tell me about Solana Blockchain",
    paragraph: "Trending in Blockchain domain.",
  },
  {
    heading: "Best Ethereum Layer 2?",
    paragraph: "Searched by 400+ users.",
  },
  {
    heading: "What’s the time in Peru?",
    paragraph: "Random fun question.",
  },
  {
    heading: "What is the future of AI",
    paragraph: "Something you might like.",
  },
];

function Search() {
  const router = useRouter();
  const [, setChatData] = useAtom(chatDataAtom);
  const [, setHistory] = useAtom(historyAtom);
  const [, setLoading] = useAtom(loadingAtom);

  const handleSuggestionCardClick = async (message: string) => {
    setLoading(true);
    const onContentReceived = (newContent: string) => {
      setChatData((prevData) => {
        const lastResponseIndex = prevData.responses.length - 1;

        return {
          ...prevData,
          responses: prevData.responses.map((response, index) =>
            index === lastResponseIndex
              ? { ...response, content: response.content + newContent }
              : response
          ),
        };
      });
    };

    const onParsedChunkReceived = (parsedChunkData: any) => {
      const sources = parsedChunkData?.sources || [];

      setChatData((prevChatData) => ({
        ...prevChatData,
        responses: [
          ...prevChatData.responses,
          { sources, content: "", timestamp: new Date().toISOString() },
        ],
      }));
    };

    try {
      await postMessage(message, onContentReceived, onParsedChunkReceived);
    } catch (error) {
      console.error("Error during postData call:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col z-10 p-3 h-full justify-center items-center">
      <div className="unlock-answer-svg-container">
        <svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M31.2812 8.9375H36.75L29.7188 19.0937V12.0625H24.25L31.2812 1.90625V8.9375ZM16.5938 25.3125H24.25L14.4062 39.5312V29.6875H6.75L16.5938 15.4688V25.3125ZM41.75 30.9375H36.2812V23.9062L29.25 34.0625H34.7188V41.0938L41.75 30.9375Z"
            fill="#A93CFF"
          />
        </svg>
      </div>

      <h2 className="text-white lg:text-[34px] font-geistMono uppercase text-[24px] font-normal tracking-[-0.02em]">
        Unlock Every Answer
      </h2>
      <div className="flex order-2 lg:order-1 w-full border border-[rgba(255,255,255,0.08)] bg-[#141823] lg:border-none lg:bg-transparent p-[8px_10px_8px_8px] rounded-[20px] lg:p-0 lg:w-[660px] items-center justify-center mt-[30px]">
        <InputWithVoice />
      </div>
      <div className="flex order-1 lg:order-2 w-full lg:w-[660px] lg:mt-[60px] mt-[70px] items-center justify-center flex-wrap gap-[10px]">
        {suggestions.map((suggestion, index) => (
          <SuggestionCard
            key={index}
            heading={suggestion.heading}
            paragraph={suggestion.paragraph}
            navigateToChat={() => {

      setHistory((prev) => {
        const lastId = prev.length > 0 ? prev[prev.length - 1].id : 0;
        return [...prev, { id: lastId + 1, value: suggestion.heading, timestamp: new Date().toISOString() }];
      });
              setChatData((prev) => ({
                ...prev,
                searchValues: [...prev.searchValues, suggestion.heading],
              }));
              router.push("/chat");
              handleSuggestionCardClick(suggestion.heading);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Search;
