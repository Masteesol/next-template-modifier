import { IconType } from "react-icons/lib";
import {
    BsFileEarmarkText,
    BsFileEarmarkTextFill,
    BsPerson,
    BsPersonFill,
    BsCreditCard2FrontFill,
    BsCreditCard2Front,
} from "react-icons/bs";
import { MdDashboard, MdOutlineDashboard } from "react-icons/md";
export interface SideBarDataType {
    path: string;
    IconOutline: IconType;
    IconFill: IconType,
    text: string;
}


export const SidebarDataAuth: SideBarDataType[] = [
    {
        path: "/app",
        IconOutline: MdOutlineDashboard,
        IconFill: MdDashboard,
        text: "Dashboard"
    },
    {
        path: "/app/templates",
        IconOutline: BsFileEarmarkText,
        IconFill: BsFileEarmarkTextFill,
        text: "Templates"
    },
    {
        path: "/app/settings",
        IconOutline: BsPerson,
        IconFill: BsPersonFill,
        text: "Settings"
    },
    {
        path: "/app/plans",
        IconOutline: BsCreditCard2Front,
        IconFill: BsCreditCard2FrontFill,
        text: "Subscriptions"
    },
]
