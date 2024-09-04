import React from 'react'
import CrossLogo from "../../assests/cross_logo.svg";
import Image from "next/image";

interface SidebarProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
  }

function Sidebar({ isSidebarOpen, toggleSidebar }: SidebarProps) {
  return (
    <div
    className={`rounded-lg w-64 h-screen bg-[#140926] text-white transform ${
      isSidebarOpen
        ? "translate-x-0 flex flex-col"
        : "-translate-x-full hidden"
    } transition-transform duration-300 ease-in-out p-[20px]`}
  >
    <div className="flex flex-col gap-[30px]">
      <button
        onClick={toggleSidebar}
        className="text-white focus:outline-none"
      >
        <Image src={CrossLogo} alt="Cross_logo" />
      </button>
      <div className="rounded-full p-[4px] gap-[10px] h-[56px] flex items-center  bg-black">
        <div className="bg-[#1F0E3C] cursor-pointer w-[121px] h-[48px] p-[15px_10px_15px_10px] flex items-center justify-center text-[16px] font-medium rounded-full border border-[#863CFF33] ">
          History
        </div>
        <span className="text-white text-[16px] p-[15px_10px_15px_10px] font-medium cursor-pointer">
          Bookmark
        </span>
      </div>
    </div>
  </div>
  )
}

export default Sidebar