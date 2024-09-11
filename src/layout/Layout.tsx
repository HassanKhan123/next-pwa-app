"use client"
import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/Siderbar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";

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
      <div className="flex">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <div
          className={`flex w-full rounded-lg h-full bg-black flex-col transition-all duration-300 ease-in-out`}
        >
          <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="flex flex-col min-h-screen">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Layout;
