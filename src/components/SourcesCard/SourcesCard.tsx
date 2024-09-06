import React from "react";
import Image from "next/image";
import { StaticImageData } from 'next/image';

interface SourceCardProps {
  text: string;
  name: string;
  image: string | StaticImageData;
}

function SourcesCard({ text, name, image }: SourceCardProps) {
  return (
    <div className="flex flex-col rounded-[18px] gap-[12px] min-w-[186.25px] max-w-[186.25px] h-[150px] p-[16px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.02)]">
      <span className="text-[14px] font-[avenir] font-normal text-[rgba(255,255,255,0.80)]">
        {text}
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
        <span className="text-[14px] font-bold font-[avenir] text-[rgba(255,255,255,0.80)]">
          {name}
        </span>
      </div>
    </div>
  );
}

export default SourcesCard;
