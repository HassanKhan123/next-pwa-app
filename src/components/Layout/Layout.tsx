import React, { useState, ReactNode } from "react";
import Sidebar from "../Siderbar/Sidebar";
import Navbar from "../Navbar/Navbar";

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
          className={`flex w-full rounded-lg m-[10px] h-full bg-black flex-col transition-all duration-300 ease-in-out`}
        >
          <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="flex flex-col p-[20px]">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Layout;
