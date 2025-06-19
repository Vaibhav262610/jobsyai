"use client"

import { useUser } from '@/app/provider'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import { Video } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard'

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

const Page: React.FC = () => {
  const { user } = useUser()
  const [interviewList, setInterviewList] = useState<InterviewType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (user) GetInterviewList()
  }, [user])

  const GetInterviewList = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('Interview')
      .select('jobPosition, duration, interview_id, Feedback(userEmail)')
      .eq('userEmail', user?.email)
      .order('id', { ascending: false })

    if (error) {
      console.error('❌ Supabase fetch error:', error.message)
    } else if (data) {
      setInterviewList(data as InterviewType[])
    }

    setLoading(false)
  }

  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl">Interview List with Candidate Feedback</h2>

      {!loading && interviewList.length === 0 && (
        <div className="p-5 flex flex-col gap-3 items-center mt-5">
          <Video className="h-10 w-10 text-primary" />
          <h2>You don't have any interview created!</h2>
          <Link href="/dashboard/create-interview">
            <Button className="cursor-pointer">+ Create New Interview</Button>
          </Link>
        </div>
      )}

      {interviewList.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
          {interviewList.map((item, index) => (
            <InterviewCard interview={item} key={index} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Page
