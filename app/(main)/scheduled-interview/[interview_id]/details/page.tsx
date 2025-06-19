"use client";
import { useUser } from '@/app/provider';
import { supabase } from '@/services/supabaseClient';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import InterviewDetailContainer from './_components/InterviewDetailContainer';
import CandidateList from './_components/CandidateList';
import { FeedbackType } from '@/types/Feedback';

type Props = {
  details: FeedbackType[];
};

type InterviewDetailsType = {
  jobPosition: string;
  duration: string;
  jobDescription: string;
  type: string;
  questionList: any;
  created_at: string;
  interview_id: string;
  Feedback: FeedbackType[];
};

const Page = () => {
  const { interview_id } = useParams();
  const [interviewDetails, setInterviewDetails] = useState<InterviewDetailsType | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (user) GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    if (!supabase) {
      setInterviewDetails(null);
      return;
    }
    const result = await supabase
      .from('Interview')
      .select('jobPosition, duration, jobDescription, type, questionList, created_at, interview_id, Feedback(userEmail, userName, feedback, created_at)')
      .eq('userEmail', user?.email)
      .eq('interview_id', interview_id);

    if (result.data && result.data.length > 0) {
      setInterviewDetails(result.data[0]);
    } else {
      console.warn("No interview found or error:", result.error);
      setInterviewDetails(null);
    }
  };

  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl">Interview Details</h2>
      <InterviewDetailContainer interviewDetails={interviewDetails} />
      {interviewDetails?.Feedback && (
        <CandidateList details={interviewDetails.Feedback} />
      )}
    </div>
  );
};

export default Page;
