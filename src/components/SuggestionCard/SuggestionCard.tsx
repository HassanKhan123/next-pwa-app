import React from "react";
import UpArrow from "../../assests/up_arrow.svg";
import Image from "next/image";

interface SuggestionCardProps {
    heading: string;
    paragraph: string;
    navigateToChat: () => void
  }

function SuggestionCard({heading,paragraph,navigateToChat}:SuggestionCardProps) {
  return (
    <div onClick={navigateToChat} className="w-[358px] cursor-pointer lg:w-[324px] lg:h-[76px] h-[69px] relative rounded-[20px] flex border border-[#863CFF33] bg-[#863CFF33] flex-col justify-center p-[20px]">
      <Image
        src={UpArrow}
        alt="up_arrow"
        className="absolute right-[10px] top-[15px]"
        width={14}
        height={14}
      />
      <span className="text-white text-[16px] font-[avenir] font-normal">
        {heading}
      </span>
      <span className="text-[rgba(255,255,255,0.10)] text-[14px] font-normal font-[avenir]">
       {paragraph}
      </span>
    </div>
  );
}

export default SuggestionCard;
