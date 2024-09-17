import React, { useState } from "react";
import CrossLogo from "../../assests/cross_logo.svg";
import Image from "next/image";
import SearchInput from "../input/search";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

function Sidebar({ isSidebarOpen, toggleSidebar }: SidebarProps) {
  const [activeTab, setActiveTab] = useState("History");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };
  return (
    <div
      className={`absolute z-20 lg:z-0 lg:static w-full rounded-lg lg:w-[25rem] h-screen bg-[#1B1B30] text-white transform ${
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
        <div className="rounded-[12px] p-[4px] gap-[10px] h-[56px]  flex items-center  bg-[#0D121C]">
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
      </div>
    </div>
  );
}

export default Sidebar;
