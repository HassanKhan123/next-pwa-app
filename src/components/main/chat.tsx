import React from "react";
import ImagesDropdown from "../dropdown/images";
import VideoDropdown from "../dropdown/videos";
import InputWithVoice from "../input/voice";
import UpArrow from "../../assests/up_arrow.svg";
import Image from "next/image";
import Collapser from "../collapser";
import InfoIcon from "../../assests/info_icon.svg";
import { collapserData } from "../../utils/CollapserData";
import AnswerCard from "../answer";
import TarsLogoWithoutExplorer from "../../assests/tars_logo_without_explorer.svg";
import SourcesIcon from "../../assests/sources_icon.svg";
import SourcesCard from "../card/sources";
import ArrowRightIcon from "../../assests/right_arrow.svg";
import { useAtom } from "jotai";
import { chatDataAtom } from "@/atoms";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DummyImage from "../../assests/dummy_source_card_image.png";
import { redirect } from "next/navigation";

function Chat() {
  const [chatData] = useAtom(chatDataAtom);

  if(chatData.searchValues.length === 0) {
    redirect("/");
}

  return (
    <div className="flex gap-[20px] lg:p-[20px] min-h-screen p-[10px] mb-[40px] justify-between w-full">
      <div className="flex flex-col gap-[30px]">
        {chatData.searchValues.map((searchValue, index) => (
          <React.Fragment key={index}>
            <h1 className="text-white text-[28px] font-normal font-[avenir]">
              {searchValue}
              {!searchValue && <Skeleton count={1} highlightColor="#803CFF" />}
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
              <div className="flex lg:flex-wrap overflow-x-scroll hide-scrollbar lg:overflow-visible w-full max-w-[350px]  lg:max-w-full gap-[10px]">
                {!chatData.responses[index]?.sources && (
                  <div className="flex  w-full gap-[10px]">
                    <Skeleton count={1} highlightColor="#803CFF" />
                  </div>
                )}
                {chatData.responses[index]?.sources
                  ?.slice(0, 4)
                  .map((source, sourceIndex) => (
                    <SourcesCard
                      key={sourceIndex}
                      text={source.text}
                      name={source.title}
                      image={DummyImage}
                      url={source.url}
                    />
                  ))}
                {/* {chatData.responses[index]?.sources && (
                  <div className="flex flex-col rounded-[8px] gap-[12px] min-w-[186.25px] max-w-[186.25px] h-[150px] p-[16px] bg-transparent border border-dotted border-[rgba(255,255,255,0.10)]">
                    <div className="flex w-full mb-[45px] items-center justify-between">
                      <span className="text-[14px] font-[avenir] font-normal text-[rgba(255,255,255,0.80)]">
                        view 4 more
                      </span>
                      <Image
                        src={ArrowRightIcon}
                        alt="arrow_right"
                        width={16}
                        height={16}
                      />
                    </div>
                    <div className="border border-[rgba(255,255,255,0.10)] w-full"></div>
                  </div>
                )} */}
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
              <AnswerCard
                isLoading={!chatData.responses[index]?.content}
                text={chatData.responses[index]?.content || ""}
              />
            </div>
            {/* <div className="flex flex-col gap-[10px]">
              <div className="flex items-center gap-[7px]">
                <Image src={InfoIcon} alt="info_icon" width={40} height={40} />
                <h3 className="text-white font-normal text-[18px]">Related</h3>
              </div>
              {collapserData.map((item, index) => (
                <Collapser key={index} text={item.text} />
              ))}
            </div> */}
            <span className="border border-dotted border-[rgba(255,255,255,0.10)] w-full"></span>

            <div className="flex border border-[rgba(255,255,255,0.08)] p-[8px_10px_8px_8px] bg-[#141823] fixed bottom-5 ml-[-12px] lg:ml-[0px] items-center w-full lg:w-[775px] rounded-[20px] lg:gap-[10px] gap-[5px]">
              <InputWithVoice />
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="hidden lg:flex flex-col z-10 gap-[10px]">
        <ImagesDropdown />
        <VideoDropdown />
      </div>
    </div>
  );
}

export default Chat;
