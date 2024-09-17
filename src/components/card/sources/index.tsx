import React from "react";
import Image from "next/image";
import { StaticImageData } from 'next/image';

interface SourceCardProps {
  text: string;
  name: string;
  image: string | StaticImageData;
  url: string;
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};


function SourcesCard({ text, name, image, url }: SourceCardProps) {

  const handleCardClick = () => {
    window.open(url, "_blank"); 
  };

  return (
    <div  onClick={handleCardClick} className="flex flex-col rounded-[8px] cursor-pointer gap-[12px] min-w-[186.25px] max-w-[186.25px] h-[150px] p-[16px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.02)]">
      <span className="text-[14px] font-roboto h-[69px] font-normal text-[rgba(255,255,255,0.80)]">
      {truncateText(text, 50)}
      </span>
      <div className="border border-[rgba(255,255,255,0.10)] w-full"></div>
      <div className="flex gap-[10px] items-center w-full">
        <Image
          src={image}
          alt="dummy"
          className="rounded-full"
          width={28}
          height={28}
        />
        <span className="text-[14px] font-bold font-roboto text-[rgba(255,255,255,0.80)]">
        {truncateText(name, 10)}
        </span>
      </div>
    </div>
  );
}

export default SourcesCard;
