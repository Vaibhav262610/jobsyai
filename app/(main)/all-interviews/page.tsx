"use client"

import { useUser } from '@/app/provider'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import { Camera, Video } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import InterviewCard from '../dashboard/_components/InterviewCard'

const page = () => {

    const [interviewList, setInterviewList] = useState([])
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

      setInterviewList(Interview)
    }

    

  return (
    <div className='my-5'>
        <h2 className='font-bold text-2xl'>All Previously Created Interviews</h2>
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

export default page