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
          className={`flex w-full rounded-lg lg:m-[10px] m-[0px] h-full bg-black flex-col transition-all duration-300 ease-in-out`}
        >
          <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="flex flex-col lg:p-[20px] p-[10px]">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Layout;
