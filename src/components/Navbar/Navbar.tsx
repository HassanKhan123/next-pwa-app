import React from 'react'
import TarsLogo from "../../assests/tars_logo.svg";
import Hamburger from "../../assests/hamburger.svg";
import Image from "next/image";


interface NavbarProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
  }

function Navbar({ isSidebarOpen, toggleSidebar }: NavbarProps) {
  return (
    <div className="flex p-[20px] w-full justify-between items-center">
    {!isSidebarOpen && (
      <button
        onClick={toggleSidebar}
        className="text-white lg:mr-[20px] mr-[0px] focus:outline-none"
      >
        <Image src={Hamburger} alt="hamburger" />
      </button>
    )}
    <div className="flex w-full items-center justify-center lg:justify-start">
      <Image src={TarsLogo} alt="tars_logo" />
    </div>
    <div className="ml-auto p-[5px_5px_5px_5px] lg:p-[5px_30px_5px_5px] gap-[10px] rounded-full bg-[#863CFF26] border border-[#863CFF33] flex items-center">
      <img
        src="https://via.placeholder.com/40"
        alt="Profile"
        className="rounded-full"
        width={36}
        height={36}
      />
      <span className="hidden lg:block text-white text-center font-[avenir] text-[18px] font-medium">
        john
      </span>
    </div>
  </div>
  )
}

export default Navbar