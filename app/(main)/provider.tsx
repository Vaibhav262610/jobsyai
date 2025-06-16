import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React, { ReactNode } from 'react'
import { AppSidebar } from './_components/AppSideBar';

type ProviderProps = {
  children: ReactNode;
};

const DashboardProvider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <>
    <SidebarProvider>
        <AppSidebar/>
        <div>
            <SidebarTrigger/>
            {children}
        </div>
    </SidebarProvider>
    </>
  )
}

export default DashboardProvider