import { IoSunny } from "react-icons/io5";
import { useEffect, useRef } from "react";
import { Avatar } from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import { items } from "../constants/SidebarData";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={sidebarRef}
      className={`absolute ${
        sidebarOpen ? "left-0" : "-left-[300px]"
      } transition-left duration-300 w-[300px] bg-slate-600 h-screen  z-10`}
    >
      <div className="flex flex-col h-full">
        <div className="bg-[#24303F] p-4 flex flex-col ">
          <div className="flex justify-between items-center">
            <Avatar className="" />
            <IoSunny className="text-white  cursor-pointer" />
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex flex-col">
              <p className="text-white">John Doe</p>
              <p className="text-gray-600 text-sm">+91 XXXXX99999</p>
            </div>
            <IoIosArrowDown className="text-white cursor-pointer" />
          </div>
        </div>
        <div className="flex-1 bg-[#161C25]">
          <div className="flex flex-col mt-2">
            {items.map((item) => {
              return (
                <div
                  className="flex items-center p-4 text-white gap-4 cursor-pointer hover:bg-[#232E3C] transition-all duration-300"
                  key={item.id}
                >
                  <item.icon />
                  <p>{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
