"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { supabase } from '@/services/supabaseClient'
import { Clock, Loader2Icon, Video } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

interface InterviewData {
  jobPosition: string
  jobDescription: string
  duration: string
  type: string
}


const page = () => {
    const [interviewData, setInterviewData] = useState<InterviewData | null>(null)
    const [loading, setLoading] = useState(false)
    const [userName, setUserName] = useState<string>("")
    const [userEmail, setUserEmail] = useState<string>("")
    const {interviewInfo, setInterviewInfo} = useContext(InterviewDataContext)
    const router = useRouter()

    const params = useParams()
    const interview_id = params.interview_id as string
    console.log(interview_id);
    
    useEffect(() => {
    if (interview_id) {
      console.log('Calling getInterviewDetails for:', interview_id)
      getInterviewDetails()
    }
  }, [interview_id])

const getInterviewDetails = async () => {
    setLoading(true)
  const { data, error } = await supabase
    .from('Interview')
    .select('jobPosition, jobDescription, duration, type')
    .eq('interview_id', interview_id)
    .single()
    
  setInterviewData(data)
  setLoading(false)
  if (error) {
    console.error('❌ Supabase fetch error:', error)
  } else if (!data) {
    console.warn('⚠️ No data returned for interview_id:', interview_id)
  } else {
    console.log('✅ Interview details:', data)
    // Optional: Set state here if you want to display it
  }
}

const OnJoinInterview =async () => {
    setLoading(true)
    let { data: Interview, error } = await supabase
    .from('Interview')
    .select('*')
    .eq('interview_id',interview_id)
    
    if (error) {
        console.error('Error fetching interview:', error);
        setLoading(false);
        return;
    }
    
    if (!Interview || Interview.length === 0) {
        console.error('No interview found');
        setLoading(false);
        return;
    }
    
    console.log(Interview[0]);
    setInterviewInfo({
        userName:userName,
        userEmail:userEmail,
        interviewData:Interview[0]
    })
    router.push('/interview/'+interview_id+'/start')
    setLoading(false)
  
}



  return (
    <div className='px-10 md:px-28 lg:px-48 xl:px-64 mt-16  '>
        <div className='flex items-center p-7 bg-white lg:px-33 xl:px-52 flex-col justify-center border rounded-lg'>
            <Image src={'/logo.png'} alt='logo' width={150} height={150} />
            <h2 className='mt-3'>AI Powered Interview Platform</h2>
            <Image src={'/interview.webp'} alt='interview' width={400} height={400} className='my-6' />
            <h2 className='font-bold text-lg mt-3 uppercase'>{interviewData?.jobPosition} </h2>
            <h2 className='text-gray-500 flex gap-2 items-center mt-3'><Clock className='h-4 w-4'/>{interviewData?.duration} </h2>
            <div className='w-full'>
                <h2>Enter your full name</h2>
                <Input placeholder='eg. John Wick' onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div className='w-full'>
                <h2>Enter your Email</h2>
                <Input placeholder='eg. John@gmail.com' onChange={(e) => setUserEmail(e.target.value)} />
            </div>
            <Button onClick={() => OnJoinInterview()} disabled={loading || !userName} className='mt-5 w-full font-bold'><Video/>{loading&&<Loader2Icon className='animate-spin'/>} Join Interview</Button>
        </div>
    </div>
  )
}

export default page