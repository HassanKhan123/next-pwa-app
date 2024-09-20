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
        <Image src={BackgroundGlowTop} alt="bg_glow" className="hidden w-full lg:flex absolute z-0 top-0" />
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div
        style={{backgroundColor: "#0D121C", height: "100vh", overflowY: "scroll"}}
          className={`flex w-full hide-scrollbar rounded-lg flex-col transition-all duration-300 ease-in-out`}
        >
          <div className="flex h-full flex-col">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Layout;
