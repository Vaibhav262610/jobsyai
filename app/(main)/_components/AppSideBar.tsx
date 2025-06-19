"use client"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { sidebaroptions } from "@/services/Constants"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {

const path = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="items-center flex  mt-5">
        <Link href="/dashboard" className="cursor-pointer">
          <Image src={'/logo.png'} alt="logo" width={150} height={200} />
        </Link>
        <Link href="/dashboard/create-interview" className="cursor-pointer">
          <Button className="w-full mt-5 py-7"><Plus/>Create New Interview</Button>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup >
            <SidebarContent>
                <SidebarMenu>
                    {sidebaroptions.map((options,index) => (
                        <SidebarMenuItem key={index} className={` p-1 ${path == options.path && 'bg-blue-100 rounded-2xl'}`}>
                            <SidebarMenuButton asChild className="p-5">
                                <Link href={options.path}>
                                    <options.icon className={` font-semibold ${path == options.path && 'text-primary'}`}/>
                                    <span className={`text-[16px] font-semibold ${path == options.path && 'text-primary'}`}>{options.name}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>    
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}