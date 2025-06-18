"use client"
import { useUser } from '@/app/provider'
import { supabase } from '@/services/supabaseClient'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import InterviewDetailContainer from './_components/InterviewDetailContainer'
import CandidateList from './_components/CandidateList'

const page = () => {
    const {interview_id } = useParams()
     const [ interviewDetails , setInterviewDetails] = useState()
    const {user} = useUser()

    useEffect(()=>{
        user&&GetInterviewList()
    },[user])

     const GetInterviewList = async () => {
        const result = await supabase
          .from('Interview')
           .select('jobPosition, duration,jobDescription,type,questionList,created_at, interview_id, Feedback(userEmail, userName,feedback,created_at)')
          .eq('userEmail', user?.email)
          .eq('interview_id', interview_id)

          setInterviewDetails(result?.data[0])
      }


  return (
    <div className='mt-5'>
        <h2 className='font-bold text-2xl'>Interviews Detail</h2>
        <InterviewDetailContainer interviewDetails={interviewDetails}/>
        <CandidateList details={interviewDetails?.['Feedback']}/>
    </div>
  )
}

export default page