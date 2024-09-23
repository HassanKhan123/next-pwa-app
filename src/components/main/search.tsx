import React, { useState } from "react";
import Image from "next/image";
import Unlock from "../../assests/unlock.svg";
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
    paragraph: "Lorem ipsum dolor sit amet, consectetur",
  },
  {
    heading: "Lorem ipsum dolor sit amet",
    paragraph: "Lorem ipsum dolor sit amet, consectetur",
  },
  {
    heading: "Lorem ipsum dolor sit amet",
    paragraph: "Lorem ipsum dolor sit amet, consectetur",
  },
  {
    heading: "Lorem ipsum dolor sit amet",
    paragraph: "Lorem ipsum dolor sit amet, consectetur",
  },
];

function Search() {
  const router = useRouter();
  const [, setChatData] = useAtom(chatDataAtom);
  const [, setHistory] = useAtom(historyAtom);
  const [,setLoading] = useAtom(loadingAtom)

  const handleSuggestionCardClick = async (message: string) => {
    setLoading(true)
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
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col z-10 mt-[20px] lg:mt-[0px] p-2 h-full justify-center items-center">
      <Image src={Unlock} alt="unlock" />
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
              setHistory((prev) => [
                ...prev,
                {
                  value: suggestion.heading,
                  timestamp: new Date().toISOString()
                } as History
              ]);
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
