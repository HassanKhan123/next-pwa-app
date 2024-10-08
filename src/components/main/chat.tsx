import React, { useEffect, useState, useRef } from "react";
import ImagesDropdown from "../dropdown/images";
import VideoDropdown from "../dropdown/videos";
import InputWithVoice from "../input/voice";
import Image from "next/image";
import Collapser from "../collapser";
import InfoIcon from "../../assests/info_icon.svg";
import AnswerCard from "../answer";
import TarsLogoWithoutExplorer from "../../assests/tars_logo_without_explorer.svg";
import SourcesIcon from "../../assests/sources_icon.svg";
import SourcesCard from "../card/sources";
import ArrowRightIcon from "../../assests/right_arrow.svg";
import { useAtom } from "jotai";
import { chatDataAtom, loadingAtom } from "@/atoms";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { redirect } from "next/navigation";
import cx from "classnames";
import { postMessage } from "@/services/api/api";
import { useSmallScreen } from "@/services/api/common";
import { truncateText } from "@/utils/helpers";

function Chat() {
  const [chatData, setChatData] = useAtom(chatDataAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const isSmallScreen = useSmallScreen()
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const latestSearchRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current && isAutoScrolling) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      if (scrollHeight - scrollTop - clientHeight > 50) {
        setIsAutoScrolling(false); 
      } else {
        setIsAutoScrolling(true);
      }
    }
  };

  useEffect(() => {
    if (chatData.searchValues.length === 0) {
      redirect("/");
      return;
    }
    if (chatData.searchValues.length > 1 && latestSearchRef.current) {
      latestSearchRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [chatData.searchValues]);

  useEffect(() => {
    scrollToBottom();
  },[chatData.responses])

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleRebuild = async (message: string, index: number) => {
    setLoading(true);

    if (!loading) {
      setChatData((prevData) => ({
        ...prevData,
        responses: prevData.responses.map((response, idx) =>
          idx === index ? { ...response, content: "" } : response
        ),
      }));

      const onContentReceived = (newContent: string) => {
        setChatData((prevData) => {
          return {
            ...prevData,
            responses: prevData.responses.map((response, idx) =>
              idx === index
                ? { ...response, content: response.content + newContent }
                : response
            ),
          };
        });
      };

      const onParsedChunkReceived = (parsedChunkData: any) => {
        const sources = parsedChunkData?.sources || [];
      };

      try {
        await postMessage(message, onContentReceived, onParsedChunkReceived);
      } catch (error) {
        console.error("Error during postData call:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      ref={chatContainerRef}
      className="overflow-y-auto z-10 hide-scrollbar max-h-[calc(100vh-100px)]"
    >
      {chatData.searchValues.map((searchValue, index) => (
        <div
          className={cx(
            "flex gap-[20px] lg:p-[20px] p-[10px] justify-between w-full"
          )}
          key={index}
        >
          <div className="flex w-full flex-col">
            <div
              className="w-full flex flex-col lg:gap-[30px] gap-[20px]"
              key={index}
              ref={
                index === chatData.searchValues.length - 1
                  ? latestSearchRef
                  : null
              }
            >
              <h1 className="text-white w-full max-w-full lg:max-w-[775px]  font-geistMono text-[28px] uppercase font-normal tracking-[-0.02em]">
                {truncateText(searchValue, 40)}
                {!searchValue && (
                  <Skeleton count={1} highlightColor="#803CFF" />
                )}
              </h1>
              <div className="flex flex-col gap-[10px]">
                <div className="flex w-full justify-between items-center gap-[7px]">
                  <div className="flex items-center gap-[7px]">
                    <Image
                      src={SourcesIcon}
                      alt="sources_icon"
                      width={40}
                      height={40}
                    />
                    <h3 className="text-white font-bold font-geistMono text-[18px]">
                      Sources
                    </h3>
                  </div>
                  {isSmallScreen &&
                  <Image
                    src={ArrowRightIcon}
                    alt="arrow_right"
                    width={16}
                    height={16}
                  />
}
                </div>

                <div className="flex flex-col lg:flex-wrap w-full max-w-[350px] lg:max-w-full gap-[10px]">
                  {!chatData.responses[index]?.sources && (
                    <Skeleton
                      className="skeleton"
                      count={1}
                      highlightColor="#803CFF"
                    />
                  )}
                  <div className="flex lg:flex-wrap overflow-x-scroll hide-scrollbar lg:overflow-visible w-full max-w-[350px] lg:max-w-full gap-[10px]">
                    {chatData.responses[index]?.sources
                      ?.slice(0, 4)
                      .map((source, sourceIndex) => (
                        <SourcesCard
                          key={sourceIndex}
                          text={source.text ? source.text : source.title}
                          name={source.title}
                          url={source.url}
                        />
                      ))}
                  </div>
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
              <div className="flex items-start flex-col gap-[10px]">
                <div className="flex self-start items-center gap-[7px]">
                  <Image
                    src={TarsLogoWithoutExplorer}
                    alt="tars_logo"
                    width={40}
                    height={40}
                  />
                  <h3 className="text-white font-bold font-geistMono text-[18px]">
                    Answer
                  </h3>
                </div>
                <AnswerCard
                  isLoading={!chatData.responses[index]?.content}
                  text={chatData.responses[index]?.content || ""}
                  searchValue={searchValue}
                  time={chatData.responses[index]?.timestamp || ""}
                  id={`answer-card-${index}`}
                  handleRebuild={() =>
                    handleRebuild(chatData.searchValues[index], index)
                  }
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
              <span className="border mb-[40px] border-dotted border-[rgba(255,255,255,0.10)] w-full max-w-full lg:max-w-[775px]"></span>
            </div>
          </div>
          <div className="hidden lg:flex flex-col gap-[10px]">
            <ImagesDropdown />
            <VideoDropdown />
          </div>
        </div>
      ))}
      <div className="flex border border-[rgba(255,255,255,0.08)] z-10 p-[8px_10px_8px_8px] bg-[#141823] fixed bottom-1 items-center w-full lg:ml-[20px] ml-[0px] lg:w-[775px] rounded-[20px] lg:gap-[10px] gap-[5px]">
        <InputWithVoice />
      </div>
    </div>
  );
}

export default Chat;
