import { IoArrowBackSharp } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import useMessageTime from "../hooks/useMessageTime";
import { ChatMessages } from "../types/msgtype";

const ChatPage = () => {
  const [messages, setMessages] = useState<ChatMessages[]>([]);
  const { id } = useParams();
  const getMessageTime = useMessageTime();
  const generateRandomColor = () => {
    let str = "#";
    for (let i = 0; i < 6; i++) {
      const randomHex = Math.floor(Math.random() * 16).toString(16); // Generate a random hexadecimal digit (0-15)
      str += randomHex;
    }
    return str;
  };

  useEffect(() => {
    const fetchMessages = async () => {
      if (id) {
        try {
          const res = await axios.get(
            `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${id}`
          );
          if (res.status === 200) {
            console.log(res.data.data);
            setMessages(res.data.data);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchMessages();
  }, [id]);
  // bg-[#0E1621]
  return (
    <div className="w-full md:flex-grow h-screen max-h-screen overflow-y-scroll bg-[url(/darkbg.jpeg)] md:bg-[#0E1621] md:bg-none bg-center">
      <div className="flex justify-between items-center px-2 py-2.5 bg-[#252D39] text-white fixed w-full md:w-[82%] z-10">
        <div className="flex items-center gap-4 max-w-max flex-grow">
          <Link to="/">
            <IoArrowBackSharp className="cursor-pointer" />
          </Link>
          <Avatar />
          <span>Hello</span>
        </div>

        <BsThreeDotsVertical />
      </div>
      <div className="text-white flex flex-col gap-3 p-3 mt-16 ml-1 md:ml-6">
        {messages.map((msg) => {
          return (
            <div className="flex gap-4" key={msg.id}>
              <Avatar
                className="self-end"
                sx={{ bgcolor: generateRandomColor() }}
              >
                {msg?.sender?.name?.slice(0, 1)}
              </Avatar>
              <div className="max-w-[300px] md:max-w-[400px] min-w-[100px] text-wrap p-2 rounded text-sm bg-[#232D3B] relative">
                <p className="mb-3">{msg.message}</p>
                <span className="absolute bottom-1 right-1 text-xs text-gray-500">
                  {msg.created_at && getMessageTime(msg.created_at, true)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatPage;
