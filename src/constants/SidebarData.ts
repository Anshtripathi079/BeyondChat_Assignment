import { IconType } from "react-icons";
import { CgProfile } from "react-icons/cg";
import { FaUserGroup } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { MdOutlinePhone } from "react-icons/md";
import { PiMapPinAreaBold } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePersonAdd } from "react-icons/md";
import { FaRegCircleQuestion } from "react-icons/fa6";

export interface Item {
  id: number;
  icon: IconType;
  text: string;
}

export const items: Item[] = [
  {
    id: 1,
    icon: CgProfile,
    text: "Profile",
  },
  {
    id: 2,
    icon: FaUserGroup,
    text: "New Group",
  },
  {
    id: 3,
    icon: FiUser,
    text: "Contacts",
  },
  {
    id: 4,
    icon: MdOutlinePhone,
    text: "Calls",
  },
  {
    id: 5,
    icon: PiMapPinAreaBold,
    text: "People Nearby",
  },
  {
    id: 6,
    icon: FaRegBookmark,
    text: "Saved Messages",
  },
  {
    id: 7,
    icon: IoSettingsOutline,
    text: "Settings",
  },
  {
    id: 8,
    icon: MdOutlinePersonAdd,
    text: "Invite Friends",
  },
  {
    id: 9,
    icon: FaRegCircleQuestion,
    text: "Telegram Features",
  },
];
