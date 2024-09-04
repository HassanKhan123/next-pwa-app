import React, { useState } from "react";
import AddIcon from "../../assests/add_icon.svg";
import Image from "next/image";

interface CollapserProps {
  text: string;
}

function Collapser({ text }: CollapserProps) {
  const [isCollapserOpen, setIsCollapserOpen] = useState(false);

  const toggleCollapser = () => {
    setIsCollapserOpen(!isCollapserOpen);
  };
  return (
    <div
      className={`flex items-center justify-between gap-[15px] bg-[rgba(255,255,255,0.05)] w-full rounded-[18px] p-[12px_16px_12px_16px] transition-all duration-300 ${
        isCollapserOpen ? "h-[200px]" : "h-[68px] lg:h-[46px]"
      }`}
    >
      <span className="text-[rgba(255,255,255,0.8)] text-[16px] font-normal">
        {text}
      </span>
      <Image
        onClick={toggleCollapser}
        src={AddIcon}
        alt="add_icon"
        width={16}
        height={16}
      />
    </div>
  );
}

export default Collapser;
