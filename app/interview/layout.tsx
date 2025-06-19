"use client"

import React, { useState, ReactNode } from 'react'
import Header from './_components/Header'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import type { InterviewInfo } from '@/context/InterviewDataContext'

const InterviewLayout = ({children}: {children: ReactNode}) => {
  const [interviewInfo, setInterviewInfo] = useState<InterviewInfo | null>(null)

    return (
    <InterviewDataContext.Provider value={{interviewInfo, setInterviewInfo}}>
    <div className='bg-secondary h-screen'>
        <Header />
        {children}
    </div>
    </InterviewDataContext.Provider>
  )
}

export default InterviewLayout