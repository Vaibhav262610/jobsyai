import React, { ReactNode } from 'react'
import DashboardProvider from './provider';

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <>
    <div className='bg-secondary'>
    <DashboardProvider>
      <div className='p-10'>
      {children}
      </div>
    </DashboardProvider>
    </div>
    </>
  )
}

export default DashboardLayout