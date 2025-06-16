import React, { ReactNode } from 'react'
import DashboardProvider from './provider';

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <>
    <DashboardProvider>
      {children}
    </DashboardProvider>
    </>
  )
}

export default DashboardLayout