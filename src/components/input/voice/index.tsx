import React, { useState } from "react";
import VoiceIcon from "../../../assests/voice_icon.svg";
import Image from "next/image";
import { chatDataAtom } from "@/atoms";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { postMessage } from "@/services/api/api";
import UpArrow from "../../../assests/up_arrow.svg";

function InputWithVoice() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [, setChatData] = useAtom(chatDataAtom);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async (message: string) => {
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
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setChatData((prev) => ({
        ...prev,
        searchValues: [...prev.searchValues, searchQuery],
      }));
      router.push("/chat");
      handleSearch(searchQuery);
      setSearchQuery("");
    }
  };

  const handleClick = () => {
    if (searchQuery) {
      setChatData((prev) => ({
        ...prev,
        searchValues: [...prev.searchValues, searchQuery],
      }));
      router.push("/chat");
      handleSearch(searchQuery);
      setSearchQuery("");
    }
  };

  return (
    <div className="relative w-full flex items-center lg:gap-[10px] gap-[5px]">
      <input
        type="text"
        placeholder="Ask me anything..."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="bg-[#0c1019] text-white rounded-[12px] h-[56px] w-full p-[2px_6px_2px_20px] border border-[rgba(255,255,255,0.10)]"
      />
      {!searchQuery && (
        <div className="absolute right-[60px] inset-y-0 flex items-center">
          <Image src={VoiceIcon} alt="voice_icon" />
        </div>
      )}
      <div
        onClick={handleClick}
        className="flex cursor-pointer items-center justify-center rounded-[12px] w-[53px] h-[54px] bg-purple-gradient"
      >
        <Image src={UpArrow} alt="up_arrow" />
      </div>
    </div>
  );
}

export default InputWithVoice;
