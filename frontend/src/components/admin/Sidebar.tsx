"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { FiMenu, FiLogOut, FiChevronDown } from "react-icons/fi";
import { FaHome, FaMicrophoneAlt, FaWrench, FaTrophy } from "react-icons/fa";
import { MdCoPresent, MdDesignServices } from "react-icons/md";
import { FaGlobe } from "react-icons/fa6";
import { RiImageEditLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Logo from "/assets/nav-logo.png";

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isExpanded,
  setIsExpanded,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isDarkMode] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsExpanded(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const competitionPaths = [
      "/dashboard/competition/poster",
      "/dashboard/competition/uiux",
      "/dashboard/competition/web-design",
    ];
    if (competitionPaths.some((p) => location.pathname.startsWith(p))) {
      setOpenMenu("competition");
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate("/login-admin");
  };

  const basePath = "/dashboard";

  const menuItems = [
    { id: "dashboard", icon: <FaHome />, label: "Dashboard", path: basePath },
    {
      id: "seminar",
      icon: <MdCoPresent />,
      label: "Seminar",
      path: `${basePath}/seminar`,
    },
    {
      id: "talkshow",
      icon: <FaMicrophoneAlt />,
      label: "Talkshow",
      path: `${basePath}/talkshow`,
    },
    {
      id: "workshop",
      icon: <FaWrench />,
      label: "Workshop",
      path: `${basePath}/workshop`,
    },
    {
      id: "competition",
      icon: <FaTrophy />,
      label: "Competition",
      children: [
        {
          id: "competition-poster",
          icon: <RiImageEditLine />,
          label: "Poster Design",
          path: `${basePath}/competition/poster`,
        },
        {
          id: "competition-uiux",
          icon: <MdDesignServices />,
          label: "UI/UX Design",
          path: `${basePath}/competition/uiux`,
        },
        {
          id: "competition-web",
          icon: <FaGlobe />,
          label: "Web Design",
          path: `${basePath}/competition/web-design`,
        },
      ],
    },
    {
      id: "event-crud",
      icon: <RiImageEditLine />,
      label: "Event Management",
      children: [
        {
          id: "category-events",
          icon: <MdCoPresent />,
          label: "Category Events",
          path: `${basePath}/admin/category-events`,
        },
        {
          id: "speakers",
          icon: <FaMicrophoneAlt />,
          label: "Pembicara",
          path: `${basePath}/admin/speakers`,
        },
        {
          id: "events",
          icon: <FaWrench />,
          label: "Events",
          path: `${basePath}/admin/events`,
        },
      ],
    },
  ];


  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const handleMenuClick = (item: {
    id: string;
    path: string;
    children: { id: string; path: string }[];
  }) => {
    if (item.children) {
      setOpenMenu(openMenu === item.id ? null : item.id);
    } else {
      navigate(item.path);
    }
  };

  const handleSubMenuClick = (sub: { id: string; path: string }) => {
    navigate(sub.path);
  };

  const sidebarVariants = {
    expanded: { width: "250px" },
    collapsed: { width: "64px" },
  };

  const overlayVariants = {
    visible: { opacity: 0.5 },
    hidden: { opacity: 0 },
  };

  return (
    <>
      {isMobile && isExpanded && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={overlayVariants}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black z-20"
          onClick={toggleSidebar}
        />
      )}

      <AnimatePresence>
        <motion.div
          initial={isExpanded ? "expanded" : "collapsed"}
          animate={isExpanded ? "expanded" : "collapsed"}
          variants={sidebarVariants}
          transition={{ duration: 0.3 }}
          className={`fixed left-0 top-0 h-screen ${
            isDarkMode ? "bg-gray-900" : "bg-white"
          } 
            shadow-lg z-30 flex flex-col overflow-hidden`}
        >
          {/* HEADER LOGO */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              {isExpanded && (
                <img
                  src={Logo || "/placeholder.svg"}
                  className="w-40"
                  alt="Invofest Logo"
                />
              )}
            </div>
            <button
              onClick={toggleSidebar}
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
                transition-colors ${
                  isDarkMode ? "text-white" : "text-gray-600"
                }`}
              aria-label="Toggle Sidebar"
            >
              <FiMenu size={20} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (item.children) {
                      // kalau punya submenu
                      handleMenuClick({
                        id: item.id,
                        path: item.children[0]?.path || "",
                        children: item.children.map((child) => ({
                          id: child.id,
                          path: child.path,
                        })),
                      });
                    } else {
                      // kalau tidak punya submenu, langsung navigate
                      navigate(item.path);
                    }
                  }}
                  className={`w-full flex items-center justify-between p-3 transition-all rounded-lg ${
                    !isExpanded ? "justify-center" : "px-4"
                  } ${
                    item.id === "dashboard"
                      ? location.pathname === item.path
                      : location.pathname === item.path ||
                        location.pathname.startsWith(item.path + "/")
                      ? `${isDarkMode ? "bg-blue-900" : "bg-blue-50"} ${
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        }`
                      : `${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        } hover:bg-gray-100 dark:hover:bg-gray-800`
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-xl">{item.icon}</span>
                    {isExpanded && <span className="ml-3">{item.label}</span>}
                  </div>

                  {isExpanded && item.children && (
                    <motion.span
                      animate={{ rotate: openMenu === item.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiChevronDown />
                    </motion.span>
                  )}
                </button>

                {/* Submenu */}
                <AnimatePresence>
                  {openMenu === item.id && item.children && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-10 mt-1 space-y-1"
                    >
                      {item.children.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleSubMenuClick(sub)}
                          className={`flex items-center w-full p-2 rounded-lg text-sm transition-colors
                            ${
                              location.pathname === sub.path
                                ? "bg-blue-100 text-blue-600"
                                : "text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                        >
                          <span className="text-lg">{sub.icon}</span>
                          {isExpanded && (
                            <span className="ml-2">{sub.label}</span>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center p-3 mt-2 rounded-lg
                ${!isExpanded ? "justify-center" : ""}
                ${
                  isDarkMode
                    ? "text-red-400 hover:bg-red-900/30"
                    : "text-red-600 hover:bg-red-50"
                }`}
              aria-label="Logout"
            >
              <FiLogOut size={20} />
              {isExpanded && <span className="ml-3">Logout</span>}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
