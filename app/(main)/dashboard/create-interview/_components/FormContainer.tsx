"use client"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InterviewType, InterviewTypeItem } from '@/services/Constants'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

type FormContainerProps = {
  OnHandleInputChange: (field: string, value: any) => void;
};

const FormContainer: React.FC<FormContainerProps> = ({ OnHandleInputChange }) => {

   const [interviewType, setInterviewType] = useState<string[]>([]);

   useEffect(() => {
    if(interviewType){
        OnHandleInputChange('type',interviewType)
    }
   },[interviewType])

   const AddInterviewType = (type: InterviewTypeItem) => {
  const isAlreadySelected = interviewType.includes(type.title);
  if (!isAlreadySelected) {
    setInterviewType(prev => [...prev, type.title]);
  } else {
    const updated = interviewType.filter(item => item !== type.title);
    setInterviewType(updated);
  }
};


  return (
    <div className='p-5 bg-white rounded-xl'>
        <div>
            <h2 className='text-sm font-medium'>Job Position</h2>
            <Input placeholder='eg. Full Stack Developer' className='mt-2' onChange={(e) => OnHandleInputChange('jobPosition', e.target.value)} />
        </div>
        <div className='mt-5'>
            <h2 className='text-sm font-medium'>Job Description</h2>
            <Textarea placeholder='Enter details job description' className='h-[200px] mt-2' onChange={(e) => OnHandleInputChange('jobDescription', e.target.value)} />
        </div>
        <div className='mt-5'>
            <h2 className='text-sm font-medium'>Interview Duration</h2>
            <Select onValueChange={(e) => OnHandleInputChange('jobPosition', e)}>
                <SelectTrigger className="w-full mt-2">
                    <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="5">5 Min</SelectItem>
                    <SelectItem value="15">15 Min</SelectItem>
                    <SelectItem value="30">30 Min</SelectItem>
                    <SelectItem value="45">45 Min</SelectItem>
                    <SelectItem value="60">60 Min</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className='mt-5'>
            <h2 className='text-sm font-medium'>Interview Type</h2>
            <div className='flex gap-3 flex-wrap mt-2'>
                {InterviewType.map((type,index) => (
                    <div key={index} onClick={() => AddInterviewType(type)} className={`flex items-center cursor-pointer hover:bg-secondary gap-2 p-1 px-2 rounded-2xl bg-blue-50 border border-gray-300  ${interviewType.includes(type.title) && 'bg-blue-50 text-primary'}`}>
                        <type.icon className='h-4 w-4 '/>
                        <span>{type.title}</span>
                    </div>
                ))}
            </div>
        </div>
        <div className='mt-7 flex justify-end'>
        <Button>Generate Question <ArrowRight/></Button>
        </div>
    </div>
  )
}

export default FormContainer