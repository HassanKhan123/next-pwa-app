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
    <div className="flex z-0 lg:z-20 p-[20px] w-full border border-[rgba(255,255,255,0.10)] lg:border-none justify-between items-center">
    {!isSidebarOpen && (
      <button
        onClick={toggleSidebar}
        className="text-white lg:mr-[20px] mr-[0px] focus:outline-none"
      >
        <Image src={Hamburger} alt="hamburger" />
      </button>
    )}
  </div>
  )
}

export default Navbar