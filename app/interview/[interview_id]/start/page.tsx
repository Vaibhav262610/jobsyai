"use client"

import { InterviewDataContext } from '@/context/InterviewDataContext'
import { Mic, Phone, Timer } from 'lucide-react'
import Image from 'next/image'
import React, { useContext } from 'react'

const StartInterview = () => {
  
  const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext)
  
  return (
    <div className='p-20 lg:px-48 xl:px-56'>
      <h2 className='font-bold text-xl flex justify-between'>AI Interview Session
        <span className='flex gap-2 items-center'>
          <Timer/>
          00:00:00
        </span>
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-7 mt-5'>
          <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
            <Image src={'/ai.png'} alt='ai' height={100} width={100} 
            className='rounded-full object-cover' />
            <h2>AI Recruiter</h2>
          </div>
          <div className='bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center'>
            <h2 className='text-2xl bg-primary text-white p-3 rounded-full px-5'>{interviewInfo?.userName[0]}</h2>
            <h2>{interviewInfo?.userName}</h2>
          </div>
      </div>
      <div className='flex justify-center items-center gap-5 mt-7'>
        <Mic className='h-12 w-12 p-3 cursor-pointer bg-gray-500 text-white rounded-full' />
        <Phone className='h-12 w-12 p-3 cursor-pointer bg-red-500 text-white rounded-full' />
      </div>
      <h2 className='text-xs text-center'>Interview in progress...</h2>
    </div>
  )
}

export default StartInterview