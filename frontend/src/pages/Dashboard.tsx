import { useState } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50 transition-all duration-300">
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarExpanded ? "ml-[250px]" : "ml-[64px]"
        }`}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
