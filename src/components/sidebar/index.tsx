import React, { useState } from "react";
import CrossLogo from "../../assests/cross_logo.svg";
import Image from "next/image";
import SearchInput from "../input/search";
import { chatDataAtom } from "@/atoms";
import { useAtom } from "jotai";
import { formatDistanceToNow } from "date-fns";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

function Sidebar({ isSidebarOpen, toggleSidebar }: SidebarProps) {
  const [activeTab, setActiveTab] = useState("History");
  const [chatData] = useAtom(chatDataAtom);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div
      className={`absolute z-20 lg:z-0 lg:static w-full rounded-lg lg:w-[25rem] h-full bg-[#1B1B30] text-white transform ${
        isSidebarOpen
          ? "translate-x-0 flex flex-col"
          : "-translate-x-full hidden"
      } transition-transform duration-300 ease-in-out pt-[30px] pl-[20px] pb-[20px] pr-[20px]`}
    >
      <div className="flex flex-col gap-[20px]">
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          <Image src={CrossLogo} alt="Cross_logo" />
        </button>

        <div className="rounded-[12px] p-[4px] gap-[10px] h-[56px] flex items-center bg-[#0D121C]">
          <div
            onClick={() => handleTabClick("History")}
            className={`cursor-pointer lg:w-[121px] text-[rgba(255,255,255,0.80)] w-[50%] h-[48px] p-[15px_10px_15px_10px] flex items-center justify-center text-[16px] font-medium rounded-[12px] border transition-all duration-300 ${
              activeTab === "History"
                ? "bg-[#1F0E3C] border-[#863CFF33]"
                : "bg-bg-[#0D121C] border-transparent"
            }`}
          >
            History
          </div>
          <div
            onClick={() => handleTabClick("Bookmark")}
            className={`w-[50%] flex items-center text-[rgba(255,255,255,0.80)] h-[48px] justify-center text-[16px] p-[15px_10px_15px_10px] font-medium cursor-pointer rounded-[12px] border transition-all duration-300 ${
              activeTab === "Bookmark"
                ? "bg-[#1F0E3C] border-[#863CFF33]"
                : "bg-[#0D121C] border-transparent"
            }`}
          >
            Bookmark
          </div>
        </div>
        <SearchInput />

        {activeTab === "History" && (
          <div className="flex flex-col gap-2 mt-4 overflow-y-auto">
            {chatData.searchValues.length > 0 ? (
              [...chatData.searchValues].reverse().map((searchValue, index) => {
                const reversedIndex = chatData.searchValues.length - 1 - index;
                return (
                  <div
                    key={index}
                    className="bg-[#252540] p-[15px] flex flex-col gap-[5px] rounded-lg text-white"
                  >
                    <p className="text-[12px] text-gray-400">
                      {chatData?.responses[reversedIndex]?.timestamp &&
                        formatDistanceToNow(
                          new Date(chatData.responses[reversedIndex].timestamp),
                          {
                            addSuffix: true,
                          }
                        )}
                    </p>
                    <p className="text-[14px]">{searchValue}</p>
                  </div>
                );
              })
            ) : (
              <p className="text-[14px] text-center text-[rgba(255,255,255,0.60)]">
                No search history available.
              </p>
            )}
          </div>
        )}
        {activeTab === "Bookmark" && (
          <div className="flex flex-col gap-2 mt-4 overflow-y-auto">
            <p className="text-[14px] text-center text-[rgba(255,255,255,0.60)]">
              No bookmarks available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
