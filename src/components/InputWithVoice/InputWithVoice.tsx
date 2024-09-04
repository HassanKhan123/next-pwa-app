import React, { useState } from "react";
import VoiceIcon from "../../assests/voice_icon.svg";
import Image from "next/image";

function InputWithVoice() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="relative w-full flex items-center">
      <input
        type="text"
        placeholder="Ask me anything..."
        value={searchQuery}
        onChange={handleInputChange}
        className="bg-black text-white rounded-full h-[56px] w-full lg:w-[597px] p-[2px_6px_2px_20px] border border-[rgba(255,255,255,0.10)]"
      />
      <div className="absolute right-0 inset-y-0 flex items-center pr-2">
        <Image src={VoiceIcon} alt="voice_icon" />
      </div>
    </div>
  );
}

export default InputWithVoice;
