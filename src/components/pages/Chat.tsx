import React from "react";
import Layout from "@/layout/Layout";
import ImagesDropdown from "../ImagesDropdown/ImagesDropdown";
import VideoDropdown from "../VideoDropdown/VideoDropdown";
import InputWithVoice from "../InputWithVoice/InputWithVoice";
import UpArrow from "../../assests/up_arrow.svg";
import Image from "next/image";
import Collapser from "../Collapser/Collapser";
import InfoIcon from "../../assests/info_icon.svg";
import { collapserData } from "../../utils/CollapserData";
import AnswerCard from "../AnswerCard/AnswerCard";
import TarsLogoWithoutExplorer from "../../assests/tars_logo_without_explorer.svg";
import SourcesIcon from "../../assests/sources_icon.svg"
import SourcesCard from "../SourcesCard/SourcesCard";
import { SourceCardData } from "../../utils/SourceCardData";
import ArrowRightIcon from "../../assests/right_arrow.svg"
import { useAtom } from "jotai";
import { searchAtom } from "@/atoms";


function Chat() {
  const [searchValue] = useAtom(searchAtom);
  return (
      <div className="flex gap-[20px] lg:p-[20px] p-[10px] justify-between w-full">
        <div className="flex flex-col gap-[30px]">
          <h1 className="text-white text-[28px] font-normal font-[avenir]">
            {searchValue ?  searchValue : "What is the price of Solana"}
          </h1>
          <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[7px]">
              <Image
                src={SourcesIcon}
                alt="sources_icon"
                width={40}
                height={40}
              />
              <h3 className="text-white font-normal text-[18px]">Sources</h3>
            </div>
            <div className="flex lg:flex-wrap overflow-x-scroll hide-scrollbar lg:overflow-visible w-full max-w-[350px] lg:max-w-full gap-[10px]">
            {SourceCardData.map((item,index) => (
            <SourcesCard key={index} text={item.text} name={item.name} image={item.image} />
            ))}
              <div className="flex flex-col rounded-[18px] gap-[12px] min-w-[186.25px] max-w-[186.25px] h-[150px] p-[16px] bg-black border border-dotted border-[rgba(255,255,255,0.10)]">
                <div className="flex w-full mb-[45px] items-center justify-between">
                  <span className="text-[14px] font-[avenir] font-normal text-[rgba(255,255,255,0.80)]">view 4 more</span>
                  <Image src={ArrowRightIcon} alt="arrow_right" width={16} height={16} />
                </div>
                <div className="border border-[rgba(255,255,255,0.10)] w-full"></div>
            </div>
          </div>
          </div>
          <div className="flex items-center flex-col gap-[10px]">
            <div className="flex self-start items-center gap-[7px]">
              <Image
                src={TarsLogoWithoutExplorer}
                alt="tars_logo"
                width={40}
                height={40}
              />
              <h3 className="text-white font-normal text-[18px]">Answer</h3>
            </div>
            <AnswerCard isLoading={false} />
          </div>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[7px]">
              <Image src={InfoIcon} alt="info_icon" width={40} height={40} />
              <h3 className="text-white font-normal text-[18px]">
                Related
              </h3>
            </div>
            {collapserData.map((item, index) => (
              <Collapser key={index} text={item.text} />
            ))}
          </div>

          <div className="flex fixed bottom-5 ml-[-12px] lg:ml-[0px] items-center w-full lg:w-[775px] lg:gap-[10px] gap-[5px]">
            <InputWithVoice />
            <div className="flex items-center justify-center rounded-full w-[53px] h-[54px] bg-purple-gradient">
              <Image src={UpArrow} alt="up_arrow" />
            </div>
          </div>
        </div>
        <div className="hidden lg:flex flex-col gap-[10px]">
          <ImagesDropdown />
          <VideoDropdown />
        </div>
      </div>
  );
}

export default Chat;
