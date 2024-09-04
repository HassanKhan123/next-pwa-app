import React from "react";
import Layout from "../Layout/Layout";
import ImagesDropdown from "../ImagesDropdown/ImagesDropdown";
import VideoDropdown from "../VideoDropdown/VideoDropdown";
import InputWithVoice from "../InputWithVoice/InputWithVoice";
import UpArrow from "../../assests/up_arrow.svg";
import Image from "next/image";
import Collapser from "../Collapser/Collapser";
import InfoIcon from "../../assests/info_icon.svg";
import { collapserData } from "./CollapserData";

function Chat() {
  return (
    <Layout>
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-[30px]">
          <h1 className="text-white text-[28px] font-normal font-[avenir]">
            What is the price of Solana
          </h1>
          <div className="flex flex-col gap-[10px]">
            <div className="flex items-center gap-[7px]">
              <Image src={InfoIcon} alt="info_icon" width={40} height={40} />
              <span className="text-white font-normal text-[18px]">
                Related
              </span>
            </div>
            {collapserData.map((item, index) => (
              <Collapser key={index} text={item.text} />
            ))}
          </div>

          <div className="flex items-center w-full lg:gap-[10px] gap-[5px]">
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
    </Layout>
  );
}

export default Chat;
