import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React, { ReactNode } from 'react'
import { AppSidebar } from './_components/AppSideBar';
import WelcomeContainer from './dashboard/_components/WelcomeContainer';

type ProviderProps = {
  children: ReactNode;
};

const DashboardProvider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <>
    <SidebarProvider>
        <AppSidebar/>
        <div className='w-full p-10'>
            {/* <SidebarTrigger/> */}
            <WelcomeContainer />
            {children}
        </div>
    </SidebarProvider>
    </>
  )
}

export default DashboardProvider