import React, {useEffect} from "react";
import PurpleRightArrow from "../../../assests/purple_right_arrow.svg";
import Image from "next/image";

interface SuggestionCardProps {
    heading: string;
    paragraph: string;
    navigateToChat: () => void
  }

function SuggestionCard({heading,paragraph,navigateToChat}:SuggestionCardProps) {

  useEffect(() => {
    const updateCursor = ({x,y}:any) => {
      document.documentElement.style.setProperty("--x", x);
      document.documentElement.style.setProperty("--y", y);
    };
  
    document.body.addEventListener("pointermove", updateCursor);
  
    return () => {
      document.body.removeEventListener("pointermove", updateCursor);
    };
  }, []);
  

  return (
    <div onClick={navigateToChat} className="w-[358px] card cursor-pointer lg:w-[324px] lg:h-[76px] h-[69px] relative rounded-[6px] flex border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)] flex-col justify-center p-[20px]">
      <Image
        src={PurpleRightArrow}
        alt="up_arrow"
        className="absolute right-0 top-0"
        width={40}
        height={40}
      />
      <span className="text-white text-[16px] font-roboto font-normal">
        {heading}
      </span>
      <span className="text-[rgba(255,255,255,0.40)] text-[14px] font-normal font-roboto">
       {paragraph}
      </span>
    </div>
  );
}

export default SuggestionCard;
