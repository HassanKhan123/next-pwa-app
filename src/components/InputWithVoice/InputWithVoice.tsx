import React, { useState } from "react";
import VoiceIcon from "../../assests/voice_icon.svg";
import Image from "next/image";
import { searchAtom } from "@/atoms";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";


function InputWithVoice() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter();
  const [searchValue, setSearchValue] = useAtom(searchAtom);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push("/chat");
      setSearchValue(searchQuery)
      setSearchQuery("")
    }
  };

  return (
    <div className="relative w-full flex items-center">
      <input
        type="text"
        placeholder="Ask me anything..."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="bg-black text-white rounded-full h-[56px] w-full p-[2px_6px_2px_20px] border border-[rgba(255,255,255,0.10)]"
      />
      <div className="absolute right-0 inset-y-0 flex items-center pr-2">
        <Image src={VoiceIcon} alt="voice_icon" />
      </div>
    </div>
  );
}

export default InputWithVoice;
