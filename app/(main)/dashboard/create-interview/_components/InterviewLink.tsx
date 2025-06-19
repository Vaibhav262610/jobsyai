import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Calendar, Clock, Copy, List, Mail, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { toast } from 'sonner';

type InterviewLinkProps = {
  interview_id: string;
  formData: {
    duration: string;
    [key: string]: any;
  };
};

const InterviewLink: React.FC<InterviewLinkProps> = ({ interview_id, formData }) => {
  const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${interview_id}`;

  const GetInterviewUrl = () => url;

  const OnCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast('Link Copied!');
  };

  return (
    <div className='flex flex-col justify-center items-center w-full mt-10'>
      <Image src={'/check.png'} alt='check' width={100} height={100} />
      <h2 className='font-bold mt-4 text-lg'>Your AI Interview is Ready!</h2>
      <p className='mt-3'>Share this link with your Candidates to start the interview process</p>
      <div className='w-full p-7 mt-6 bg-white  rounded-lg'>
        <div className='flex items-center justify-between'>
          <h2 className='font-bold'>Interview Link</h2>
          <h2 className='p-1 px-2 text-primary bg-blue-50 rounded-xl'>Valid for 30 Days!</h2>
        </div>
        <div className='mt-3 flex gap-3 items-center'>
          <Input defaultValue={GetInterviewUrl()} disabled />
          <Button onClick={OnCopyLink}>
            <Copy />
            Copy Link
          </Button>
        </div>
        <hr className='my-5' />
        <div className='flex gap-5 '>
          <h2 className='text-sm text-gray-500 flex gap-2 items-center'>
            <Clock className='h-4 w-4 ' /> {formData?.duration}
          </h2>
          <h2 className='text-sm text-gray-500 flex gap-2 items-center'>
            <List className='h-4 w-4 ' /> 10 Questions
          </h2>
        </div>
      </div>
      <div className='mt-7 bg-white p-5 rounded-lg w-full'>
        <h2 className='font-bold'>Share Via</h2>
        <div className='gap-5 flex mt-2 justify-around items-center'>
          <Button variant={'outline'}>
            <Mail /> Email
          </Button>
          <Button variant={'outline'}>
            <Mail /> Slack
          </Button>
          <Button variant={'outline'}>
            <Mail /> Whatsapp
          </Button>
        </div>
      </div>
      <div className='flex w-full gap-5 justify-between mt-6'>
        <Link href='/dashboard'>
          <Button variant={'outline'}>
            <ArrowLeft /> Back to Dashboard
          </Button>
        </Link>
        <Link href='/dashboard'>
          <Button>
            <Plus />
            Create New Interview
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InterviewLink;
