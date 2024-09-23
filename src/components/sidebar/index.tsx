import React, { useState } from "react";
import CrossLogo from "../../assests/cross_logo.svg";
import Image from "next/image";
import SearchInput from "../input/search";
import { chatDataAtom, bookmarkAtom, historyAtom, loadingAtom } from "@/atoms";
import { useAtom } from "jotai";
import { postMessage } from "@/services/api/api";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { groupByDate } from "@/utils/helpers";
import cx from "classnames";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

function Sidebar({ isSidebarOpen, toggleSidebar }: SidebarProps) {
  const [activeTab, setActiveTab] = useState("History");
  const [history, setHistory] = useAtom(historyAtom);
  const [chatData, setChatData] = useAtom(chatDataAtom);
  const [loading, setLoading] = useAtom(loadingAtom)
  const [bookmarks] = useAtom(bookmarkAtom);
  const router = useRouter();
  const pathName = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    setSearchQuery("");
  };

  const handleSearchInputChange = (input: string) => {
    setSearchQuery(input);
  };

  const handleToggleSidebar = () => {
    setSearchQuery("");
    toggleSidebar(); 
  };


  const handlePost = async (message: string) => {
    setLoading(true)
    if(!loading){
    if (pathName !== "/chat") {
      await router.push("/chat");
    }

    const timestamp = new Date().toISOString();

    setHistory((prev) => [...prev, { value: message, timestamp }]);

    setChatData((prev) => ({
      ...prev,
      searchValues: [...prev.searchValues, message],
    }));

    const onContentReceived = (newContent: string) => {
      setChatData((prevData) => {
        const lastResponseIndex = prevData.responses.length - 1;

        return {
          ...prevData,
          responses: prevData.responses.map((response, index) =>
            index === lastResponseIndex
              ? { ...response, content: response.content + newContent }
              : response
          ),
        };
      });
    };

    const onParsedChunkReceived = (parsedChunkData: any) => {
      const sources = parsedChunkData?.sources || [];

      setChatData((prevChatData) => ({
        ...prevChatData,
        responses: [
          ...prevChatData.responses,
          { sources, content: "", timestamp: new Date().toISOString() },
        ],
      }));
    };

    try {
      await postMessage(message, onContentReceived, onParsedChunkReceived);
    } catch (error) {
      console.error("Error during postData call:", error);
    } finally {
      setLoading(false)
    }
  }
  };

  const groupedHistory = groupByDate(history);

  const filteredHistory = Object.entries(groupedHistory).reduce(
    (acc, [dateLabel, values]) => {
      const filteredValues = values.filter((value) =>
        value.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredValues.length > 0) {
        acc[dateLabel] = filteredValues;
      }
      return acc;
    },
    {} as Record<string, string[]>
  );

  return (
    <div
      className={cx(
        "absolute hide-scrollbar z-30 lg:static w-full rounded-lg lg:w-[20rem] h-full bg-custom-purple text-white transform transition-transform duration-300 ease-in-out pt-[30px] pl-[10px] pb-[10px] pr-[10px]",
        {
          "translate-x-0 flex flex-col": isSidebarOpen,
          "-translate-x-full hidden": !isSidebarOpen,
        }
      )}
      style={{height: "99vh", overflowY: "scroll"}}
    >
      <div className="flex flex-col gap-[20px]">
        <button className="text-white z-10 focus:outline-none">
          <Image onClick={handleToggleSidebar} src={CrossLogo} alt="Cross_logo" />
        </button>

        <div className="rounded-[12px] p-[4px] gap-[10px] h-[56px] flex items-center bg-[#0D121C]">
          <div
            onClick={() => handleTabClick("History")}
            className={cx(
              "cursor-pointer lg:w-[121px] w-[50%] h-[48px] p-[15px_10px_15px_10px] flex items-center justify-center text-[16px] font-normal rounded-[12px] border transition-all duration-300",
              {
                "bg-[#1F0E3C] border-custom-purple-border":
                  activeTab === "History",
                "bg-[#0D121C] border-transparent": activeTab !== "History",
              }
            )}
          >
            History
          </div>
          <div
            onClick={() => handleTabClick("Bookmark")}
            className={cx(
              "cursor-pointer w-[50%] h-[48px] p-[15px_10px_15px_10px] flex items-center justify-center text-[16px] font-normal rounded-[12px] border transition-all duration-300",
              {
                "bg-[#1F0E3C] border-custom-purple-border":
                  activeTab === "Bookmark",
                "bg-[#0D121C] border-transparent": activeTab !== "Bookmark",
              }
            )}
          >
            Bookmark
          </div>
        </div>
        <SearchInput value={searchQuery} onChange={handleSearchInputChange} />

        {activeTab === "History" && (
          <div className="flex flex-col gap-2">
            {Object.keys(filteredHistory).length > 0 ? (
              Object.entries(filteredHistory).map(
                ([dateLabel, values], index) => (
                  <div
                    className="flex cursor-pointer flex-col gap-[10px]"
                    key={index}
                  >
                    <span className="text-[15px] text-[rgba(169,60,255,1)] font-normal font-roboto rounded-[6px] bg-[#222337] shadow-custom-inset p-[4px_10px_4px_10px] border border-[rgba(255,255,255,0.08)]">
                      {dateLabel}
                    </span>
                    {values
                      .slice()
                      .reverse()
                      .map((value, valueIndex) => (
                        <div
                          key={valueIndex}
                          onClick={() => handlePost(value)}
                          className="cursor-pointer p-[10px] flex flex-col rounded-lg text-white"
                        >
                          <p className="text-[15px] text-[rgba(242,244,247,1)] font-normal font-roboto">
                            {value}
                          </p>
                        </div>
                      ))}
                  </div>
                )
              )
            ) : (
              <p className="text-[14px] text-center text-[rgba(255,255,255,0.60)]">
                No search history available.
              </p>
            )}
          </div>
        )}
        {activeTab === "Bookmark" && (
          <div className="flex flex-col gap-2">
            {bookmarks.filter((bookmark) =>
              bookmark.toLowerCase().includes(searchQuery.toLowerCase())
            ).length > 0 ? (
              bookmarks
                .filter((bookmark) =>
                  bookmark.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((bookmark, index) => (
                  <div
                    key={index}
                    onClick={() => handlePost(bookmark)}
                    className="bg-[#252540] cursor-pointer p-[15px] flex flex-col gap-[5px] rounded-lg text-white"
                  >
                    <p className="text-[14px]">
                      {index + 1}. {bookmark}
                    </p>
                  </div>
                ))
            ) : (
              <p className="text-[14px] text-center text-[rgba(255,255,255,0.60)]">
                No bookmarks available.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
