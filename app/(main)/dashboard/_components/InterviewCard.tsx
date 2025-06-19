import React from 'react'
import moment from 'moment'
import { Button } from '@/components/ui/button'
import { ArrowRight, Copy, Send } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

interface Interview {
  interview_id: string
  created_at: string
  jobPosition: string
  duration: string
  type: string
  Feedback?: Array<any>
  candidates?: Array<any>
  feedback?: Array<any>
}

interface InterviewCardProps {
  interview: Interview
  viewDetail?: boolean
}

const InterviewCard: React.FC<InterviewCardProps> = ({interview, viewDetail}) => {
    const url = process.env.NEXT_PUBLIC_HOST_URL+"/"+interview?.interview_id; 
    
    // Debug logs
    console.log('Interview Data:', interview)
    console.log('Feedback:', interview.Feedback)
    console.log('feedback:', interview.feedback)
    console.log('candidates:', interview.candidates)
    
    const copyLink = () => {
     navigator.clipboard.writeText(url)
     toast("Copied")   
    }

    const onSend=()=>{
        window.location.href = "mailto:accouts@vaibhavrajpoot2626@gmail.com?subject=AiCruiter Interview Link & body=Interview Link:"+url
    }

    // Calculate total candidates considering both possible property names
    const totalCandidates = (interview.Feedback?.length || 0) + 
                          (interview.feedback?.length || 0) + 
                          (interview.candidates?.length || 0)

  return (
    <div className='p-5 bg-white rounded-lg border '>
        <div className='flex justify-between items-center'>
            <div className='h-[35px] bg-primary w-[35px] rounded-full'></div>
            <h2 className='text-sm'>{moment(interview?.created_at).format('DD MMM yyy')}</h2>
        </div>
        <h2 className='mt-3 font-medium uppercase text-lg '>{interview?.jobPosition}</h2>
        <h2 className='mt-2 text-sm flex justify-between'>{interview?.duration} Min
            <span className='text-green-700'>{totalCandidates} Candidates</span>
        </h2>
        {!viewDetail ? <div className='flex gap-3 mt-5 w-full'>
            <Button onClick={() => copyLink()} variant={'outline'}><Copy />Copy Link</Button>
            <Button onClick={onSend}><Send />Send</Button>
        </div> :
        <Link href={'/scheduled-interview/'+interview?.interview_id+'/details'}>
            <Button className='mt-5 w-full' variant={'outline'}>View Details <ArrowRight /></Button>
        </Link>
        }
    </div>
  )
}

export default InterviewCard