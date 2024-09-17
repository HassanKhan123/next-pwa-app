"use client"
import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import Image from "next/image";
import BackgroundGlowTop from "../assests/background_glow_top.png"

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="flex relative">
        <Image src={BackgroundGlowTop} alt="bg_glow" className="hidden w-full lg:block absolute top-0" />
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div
        style={{backgroundColor: "#0D121C"}}
          className={`flex w-full rounded-lg h-full flex-col transition-all duration-300 ease-in-out`}
        >
          <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="flex flex-col z-10 min-h-screen">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Layout;
