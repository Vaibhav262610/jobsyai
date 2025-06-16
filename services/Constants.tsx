import { BriefcaseBusinessIcon, Calendar, Code2Icon, LayoutDashboard, List, LucideIcon, Puzzle, Settings, User2Icon, WalletCards } from "lucide-react";

export const sidebaroptions = [
    {
        name:"Dashboard",
        icon:LayoutDashboard,
        path:'/dashboard'
    },
    {
        name:"Scheduled Interview",
        icon:Calendar,
        path:'/scheduled-interview'
    },
    {
        name:"All Interviews",
        icon:List,
        path:'/all-interviews'
    },
    {
        name:"Billing",
        icon:WalletCards,
        path:'/billing'
    },
    {
        name:"Settings",
        icon:Settings,
        path:'/settings'
    },
]

export type InterviewTypeItem = {
  title: string;
//   title: string;
  icon: LucideIcon; // or `React.ElementType` if you're not using Lucide-specific icons
};

export const InterviewType: InterviewTypeItem[] = [
    {
        title: "Technical",
        icon: Code2Icon,
    },
    {
        title: "Behavioral",
        icon: User2Icon,
    },
    {
        title: "Experience",
        icon: BriefcaseBusinessIcon,
    },
    {
        title: "Problem Solving ",
        icon: Puzzle,
    },
    {
        title: "Leadership",
        icon: Code2Icon,
    },
]