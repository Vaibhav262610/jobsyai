"use client"

import { useUser } from '@/app/provider'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import { Camera, Video } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import InterviewCard from './InterviewCard'

type InterviewType = {
  jobPosition: string
  duration: string
  interview_id: string
  created_at: string
  type:string
  Feedback: {
    userEmail: string
  }[]
}


const LatestInterviewsLists = () => {

    const [interviewList, setInterviewList] = useState<InterviewType[]>([]);
    const {user} = useUser()


    useEffect(()=>{
      user&&GetInterviewList()
    },[user])


    const GetInterviewList = async() => {
      let {data: Interview, error }= await supabase
      .from('Interview')
      .select("*")
      .eq("userEmail",user?.email)
      .order('id',{ ascending : false })
      .limit(6)
      
      if (error) {
        console.error("Error fetching interviews:", error);
        return;
      }
      if (Interview) {
        setInterviewList(Interview); // Now safe
      } else {
        setInterviewList([]); // Optional: reset to empty array if null
      }
    }

    

  return (
    <div className='my-5'>
        <h2 className='font-bold text-2xl'> Previously Created Interviews</h2>
        {interviewList.length ==0 && 
            <div className='p-5 flex flex-col gap-3 items-center  mt-5'>
                <Video className='h-10 w-10 text-primary' />
                <h2>You don't have any interview created!</h2>
                <Link href='/dashboard/create-interview' >
                  <Button className='cursor-pointer'>+ Create New Interview</Button>
                </Link>
            </div>
        }
        {interviewList&&
        <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5 '>
          {interviewList.map((item,index) => (
            <InterviewCard interview={item} key={index} />
          ) )}
        </div>
        }
    </div>
  )
}

export default LatestInterviewsLists