import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'


type FeedbackType = {
  userEmail: string;
  userName: string;
  created_at: string;
  feedback: {
    rating: {
      technicalSkills: number;
      communication: number;
      problemSolving: number;
      experience: number;
    };
    summery: string;
    Recommendation: string;
    RecommendationMsg: string;
  };
};

const CandidateFeedbackDialog: React.FC<{ item: FeedbackType }> = ({ item }) => {
  const feedback = item?.feedback;
    // console.log(feedback?.feedback?.summery);
    

  return (
    <Dialog>
  <DialogTrigger asChild>
    <Button variant={'outline'} className='text-primary'>View Report</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Feedback</DialogTitle>
      <DialogDescription asChild>
        <div className='mt-5'>
            <div className='flex flex-col justify-center items-center'>
                <div className='flex justify-between gap-5 w-full items-center'>
                    <div className='flex items-center gap-5'>
                        <h2 className='bg-primary rounded-full px-4.5 font-bold text-white p-3'>{item?.userName[0]}</h2>
                        <div>
                            <h2 className='font-bold'>{item?.userName}</h2>
                            <h2 className='text-sm text-gray-500'>{item?.userEmail}</h2>
                        </div>
                    </div>
                    <div>
                        <h2 className='text-green-600 font-bold text-xl'>6/10</h2>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <h2 className='text-primary text-2xl font-bold'></h2>
                </div>
                <div className='mt-5 w-full ' >
                    <h2 className='font-bold'>Skills Assessment</h2>
                    <div className='mt-5 grid gap-10 grid-cols-2'>
                        <div className=''>
                            <h2 className='flex justify-between items-center'>Technical Skills <span>{feedback?.rating?.technicalSkills}/10</span></h2>
                            <Progress className='mt-1' value={feedback?.rating?.technicalSkills*10} />
                        </div>
                        <div className=''>
                            <h2 className='flex justify-between items-center'>Communication <span>{feedback?.rating?.communication}/10</span></h2>
                            <Progress className='mt-1' value={feedback?.rating?.communication*10} />
                        </div>
                        <div className=''>
                            <h2 className='flex justify-between items-center'>Problem Solving <span>{feedback?.rating?.problemSolving}/10</span></h2>
                            <Progress className='mt-1' value={feedback?.rating?.problemSolving*10} />
                        </div>
                        <div className=''>
                            <h2 className='flex justify-between items-center'>Experience <span>{feedback?.rating?.experience}/10</span></h2>
                            <Progress className='mt-1' value={feedback?.rating?.experience*10} />
                        </div>
                    </div>
                </div>
                <div className='mt-5'>
                    <h2 className='font-bold'>Performance Summary</h2>
                 <div className='p-5 bg-secondary my-3  rounded-md'>
                    {/* {feedback?.summery?.map((summ,index) => ( */}
                        <p>{feedback?.summery}</p>
                    {/* ))} */}
                    </div>
                </div>
            </div>
            <div className={`p-5 mt-10 flex items-center justify-between rounded-md ${feedback?.Recommendation=='No'?'bg-red-100' : 'bg-green-100'}`}>
                <div>
                    <h2 className={`font-bold p-5 rounded-md ${feedback?.Recommendation=='No'?'text-red-700' : 'text-green-700'}`}>Recommendation Msg:</h2>
                    <p className={`p-5 rounded-md ${feedback?.Recommendation=='No'?'text-red-500' : 'text-green-500'}`}>{feedback?.RecommendationMsg}</p>
                </div>
                <Button className={`p-5 rounded-md ${feedback?.Recommendation=='No'?'bg-red-700' : 'bg-green-700'}`}>Proceed To Hire</Button>
            </div>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}

export default CandidateFeedbackDialog