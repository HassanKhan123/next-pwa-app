import React, {useCallback} from "react";
import Image from "next/image";
import Unlock from "../../assests/unlock.svg";
import InputWithVoice from "../input/voice";
import SuggestionCard from "../card/suggestion";
import { useRouter } from "next/navigation";
import { chatDataAtom } from "@/atoms";
import { useAtom } from "jotai";
import { postMessage } from "@/services/api/api";

const suggestions = [
  {
    heading: "Tell me the price of Btc",
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

  const handleSuggestionCardClick = async (message: string) => {
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
    }
  }

  return (
    <div className="flex flex-col h-[85vh] justify-start lg:justify-center items-center">
      <Image src={Unlock} alt="unlock" />
      <h2 className="text-white lg:text-[34px] text-[24px] font-medium">
        Unlock Every Answer
      </h2>
      <div className="flex order-2 lg:order-1 w-full p-2 lg:p-0 lg:w-[660px] items-center justify-center mt-[30px]">
        <InputWithVoice />
      </div>
      <div className="flex order-1 lg:order-2 w-full lg:w-[660px] mt-[30px] items-center justify-center flex-wrap gap-[10px]">
        {suggestions.map((suggestion, index) => (
          <SuggestionCard
            key={index}
            heading={suggestion.heading}
            paragraph={suggestion.paragraph}
            navigateToChat={() => {
              setChatData((prev) => ({
                ...prev,
                searchValues: [...prev.searchValues, suggestion.heading], 
              }));
              router.push("/chat");
              handleSuggestionCardClick(suggestion.heading)
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Search;
