import { IoSearch, IoMenu } from "react-icons/io5";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState, useRef, FC } from "react";
import axios from "axios";
import { ApiResponse, ChatMessage } from "../types/types";
import { Link } from "react-router-dom";
import useMessageTime from "../hooks/useMessageTime";
import { tabsData } from "../constants/ChatListData";

interface ChatListProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const ChatList: FC<ChatListProps> = ({ setSidebarOpen }) => {
  const [msgData, setMsgData] = useState<ChatMessage[]>([]);
  const [originalData, setOriginalData] = useState<ChatMessage[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const getMessageTime = useMessageTime();
  const [tabs, setTabs] = useState<tabsData[]>(tabsData);

  const handleScroll = () => {
    const sidebar = sidebarRef.current;
    if (
      sidebar &&
      sidebar.scrollHeight - sidebar.scrollTop <= sidebar.clientHeight + 1
    ) {
      setPage((prev) => prev + 1);
      console.log("Reached bottom, loading more...");
    }
  };

  const getMessageCounts = () => {
    const endedCount = originalData.filter(
      (item) => item.status === "ended"
    ).length;
    const ongoingCount = originalData.filter(
      (item) => item.status === "ongoing"
    ).length;
    const allCount = originalData.length;
    return { endedCount, ongoingCount, allCount };
  };

  const handleTabClick = (tid: number, content: string) => {
    const newTabs = tabs.map((item) =>
      item.id === tid ? { ...item, active: true } : { ...item, active: false }
    );
    setTabs(newTabs);
    let filteredData;
    if (content === "Ended") {
      filteredData = originalData.filter((item) => item.status === "ended");
    } else if (content === "Ongoing") {
      filteredData = originalData.filter((item) => item.status === "ongoing");
    } else {
      filteredData = originalData;
    }
    setMsgData(filteredData);
  };

  const fetchLastMessage = async (chatId: number) => {
    try {
      const res = await axios.get(
        `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`
      );
      if (res.status === 200) {
        const chatData = res.data.data;
        const lastMsg = chatData[chatData.length - 1];
        return [lastMsg.message, lastMsg.created_at];
      }
    } catch (err) {
      console.error(err);
    }
    return ["No message content", ""];
  };

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get<ApiResponse>(
          `https://devapi.beyondchats.com/api/get_all_chats?page=${page}`
        );
        if (res.status === 200) {
          const newMsgData = await Promise.all(
            res.data.data.data.map(async (chat) => {
              const lastMsg = await fetchLastMessage(chat.id);
              const msg = {
                lastMessage: lastMsg[0],
                msgDate: lastMsg[1],
              };
              return { ...chat, ...msg };
            })
          );
          setMsgData((prev) => [...prev, ...newMsgData]);
          setOriginalData((prev) => [...prev, ...newMsgData]);
        }
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [page]);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (sidebar) {
      sidebar.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (sidebar) {
        sidebar.removeEventListener("scroll", handleScroll);
      }
    };
  }, [msgData]);

  useEffect(() => {
    const { endedCount, ongoingCount, allCount } = getMessageCounts();
    setTabs([
      { id: 1, content: `All`, active: true, value: allCount },
      { id: 2, content: `Ongoing`, active: false, value: ongoingCount },
      { id: 3, content: `Ended`, active: false, value: endedCount },
    ]);
  }, [originalData]);

  return (
    <div
      ref={sidebarRef}
      className="h-full max-h-screen w-full md:w-[350px] overflow-y-scroll scrollbar-hide bg-[#1C2732]"
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center px-2 py-4 bg-[#252D39] text-white border-r border-r-1 border-gray-800">
          <div className="flex gap-5 items-center">
            <IoMenu
              className="font-bold text-xl cursor-pointer"
              onClick={handleMenuClick}
            />
            <span className="font-bold text-xl">Telegram</span>
          </div>
          <IoSearch className="text-xl font-bold cursor-pointer mr-2" />
        </div>
        <div className="bg-[#252D39] p-2 flex gap-4 text-white text-sm overflow-x-scroll scrollbar-hide">
          {tabs.map((item) => (
            <div
              className={`flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                item.active && "tabs-div"
              }`}
              key={item.id}
              onClick={() => handleTabClick(item.id, item.content)}
            >
              <span className="">{item.content}</span>
              <span className="text-xs px-2 py-1 rounded bg-gray-600">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      {msgData.map((item, index) => (
        <Link
          to={`/chat/${item.id}`}
          className="bg-[#1C2732] flex px-3 py-3 items-center justify-between cursor-pointer"
          key={index}
        >
          <div className="flex items-center w-[calc(100%-50px)] overflow-hidden">
            <Avatar>{item.creator.name?.slice(0, 1).toUpperCase()}</Avatar>
            <div className="flex flex-col ml-2 flex-1 overflow-hidden">
              <p className="text-white font-semibold">
                {item.creator.name || "John Doe"}
              </p>
              <p className="text-gray-400 text-sm overflow-hidden overflow-ellipsis whitespace-nowrap mt-0.5">
                {item.lastMessage || "No message content"}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end w-[50px]">
            <p className="text-gray-400 font-semibold text-xs">
              {item?.msgDate && getMessageTime(item?.msgDate, false)}
            </p>
            {/* <p className="p-1 rounded-full bg-gray-600 w-5 h-5 flex items-center justify-center text-xs text-white mt-1">
              5
            </p> */}
          </div>
        </Link>
      ))}
      {loading && (
        <div className="text-center py-4 text-white bg-[#252D39] h-full">
          Loading...
        </div>
      )}
    </div>
  );
};

export default ChatList;
