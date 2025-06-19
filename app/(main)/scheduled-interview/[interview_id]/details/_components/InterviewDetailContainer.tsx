import { Calendar, Clock } from 'lucide-react';
import moment from 'moment';
import React from 'react';
import { InterviewDetailsType } from '@/types/Interview'; // ✅ Import from shared types if separated

type Props = {
  interviewDetails: InterviewDetailsType | null;
};

const InterviewDetailContainer: React.FC<Props> = ({ interviewDetails }) => {
  if (!interviewDetails) return null;

  const interviewType = (() => {
    try {
      const parsed = JSON.parse(interviewDetails.type);
      return Array.isArray(parsed) ? parsed[0] : parsed;
    } catch {
      return interviewDetails.type;
    }
  })();

  return (
    <div className="p-5 bg-white rounded-lg mt-5">
      <h2 className="uppercase font-bold text-lg">{interviewDetails.jobPosition}</h2>

      <div className="flex w-full justify-between items-center lg-pr-52">
        <div className="mt-4">
          <h2 className="text-sm text-gray-500">Duration</h2>
          <h2 className="flex text-sm font-bold items-center gap-2">
            <Clock className="h-4 w-4" />
            {interviewDetails.duration}
          </h2>
        </div>

        <div className="mt-4">
          <h2 className="text-sm text-gray-500">Created On</h2>
          <h2 className="flex text-sm font-bold items-center gap-2">
            <Calendar className="h-4 w-4" />
            {moment(interviewDetails.created_at).format('MMM DD YYYY')}
          </h2>
        </div>

        {interviewType && (
          <div className="mt-4">
            <h2 className="text-sm text-gray-500">Type</h2>
            <h2 className="flex text-sm font-bold items-center gap-2">
              <Clock className="h-4 w-4" />
              {interviewType}
            </h2>
          </div>
        )}
      </div>

      <div className="mt-5">
        <h2 className="font-bold">Job Description</h2>
        <p className="text-sm leading-6">{interviewDetails.jobDescription}</p>
      </div>

      <div className="mt-5">
        <h2 className="font-bold">Interview Questions</h2>
        <div className="grid grid-cols-2 mt-3 gap-3">
          {interviewDetails.questionList?.map((item, index) => (
            <h2 key={index} className="text-xs">
              {index + 1}. {item?.question}
            </h2>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewDetailContainer;
