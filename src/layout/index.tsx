"use client"
import React, { useState, ReactNode , useEffect} from "react";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import Image from "next/image";
import BackgroundGlowTop from "../assests/background_glow_top.png"
import { useSmallScreen } from "@/services/api/common";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const isSmallScreen = useSmallScreen();
  const [isSidebarOpen, setSidebarOpen] = useState(!isSmallScreen);

  useEffect(() => {
    setSidebarOpen(!isSmallScreen);
  }, [isSmallScreen]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <div className="flex relative">
        <Image src={BackgroundGlowTop} alt="bg_glow" className="hidden w-full lg:flex absolute z-0 top-0" />
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div
        style={{backgroundColor: "#0D121C", height: "100vh"}}
          className={`flex w-full rounded-lg flex-col transition-all duration-300 ease-in-out`}
        >
               <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="flex h-full flex-col">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Layout;
