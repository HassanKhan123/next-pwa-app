import React from "react";
import CrossLogo from "../../assests/cross_logo.svg";
import Image from "next/image";
import SearchInput from "../SearchInput/SearchInput";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

function Sidebar({ isSidebarOpen, toggleSidebar }: SidebarProps) {
  return (
    <div
      className={`absolute z-20 lg:z-0 lg:static w-full rounded-lg lg:w-[25rem] h-screen bg-[#140926] text-white transform ${
        isSidebarOpen
          ? "translate-x-0 flex flex-col"
          : "-translate-x-full hidden"
      } transition-transform duration-300 ease-in-out pt-[30px] pl-[20px] pb-[20px] pr-[20px]`}
    >
      <div className="flex flex-col gap-[30px]">
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          <Image src={CrossLogo} alt="Cross_logo" />
        </button>
        <div className="rounded-full p-[4px] gap-[10px] h-[56px]  flex items-center  bg-black">
          <div className="bg-[#1F0E3C] cursor-pointer lg:w-[121px] w-[50%] h-[48px] p-[15px_10px_15px_10px] flex items-center justify-center text-[16px] font-medium rounded-full border border-[#863CFF33] ">
            History
          </div>
          <span className="text-white w-[50%] flex items-center justify-center text-[16px] p-[15px_10px_15px_10px] font-medium cursor-pointer">
            Bookmark
          </span>
        </div>
        <SearchInput />
      </div>
    </div>
  );
}

export default Sidebar;
