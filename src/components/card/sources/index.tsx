import React from "react";
import { truncateText } from "@/utils/helpers";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

interface SourceCardProps {
  text: string;
  name: string;
  url: string;
}

function SourcesCard({ text, name, url }: SourceCardProps) {
  const handleCardClick = () => {
    window.open(url, "_blank");
  };
  

  return (
    <div
      onClick={handleCardClick}
      className="flex flex-col rounded-[8px] cursor-pointer gap-[12px] min-w-[186.25px] max-w-[186.25px] h-[150px] p-[16px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.02)]"
    >
      <span className="text-[14px] font-roboto h-[69px] overflow-hidden whitespace-wrap text-ellipsis font-normal text-source-text-color">
        {truncateText(text, 50)} 
      </span>
      <div className="border border-[rgba(255,255,255,0.10)] w-full"></div>
      <div className="flex gap-[10px] items-center w-full">
        <span    data-tooltip-id="source-name-tooltip"
          data-tooltip-content={name} className="text-[14px] font-medium font-roboto text-source-title-color">
          {truncateText(name, 15)}
        </span>
        <Tooltip id="source-name-tooltip"  style={{ backgroundColor: 'white', color: 'black' }} place="bottom" />
      </div>
    </div>
  );
}

export default SourcesCard;
