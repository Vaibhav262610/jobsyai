"use client";

import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import FormContainer from "./_components/FormContainer";
import QuestionLists from "./_components/QuestionLists";
import { toast } from "sonner";
import InterviewLink from "./_components/InterviewLink";
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";

type FormData = {
  [key: string]: any;
};

const CreateInterview: React.FC = () => {
  const router = useRouter();
  const {user} = useUser()
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({});
 const [interviewId , setInterviewId] = useState<string | null>(null)
  

  const OnHandleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  console.log("user data ", user?.email);
  const OnGoToNext =async () => {
    let credits = await supabase
    .from('Users')
    .select('credits')
    .eq('email',user?.email)
    if (credits.data) {
      const myCredits = credits.data[0]?.credits;
      console.log(myCredits);
    } else {
      console.error("No CREDIT data returned from Supabase:", credits.error);
    }
    
   if (!credits.data || credits.data[0]?.credits <= 0) {
      toast('Please Add Credits!');
      return;
    } else {
      await supabase
        .from('User')
        .update({ credits: Number(user?.credits) - 1 })
        .eq('email', user?.email)
        .select();
    }

    if(!formData?.jobPosition || !formData?.jobDescription || !formData?.duration || !formData?.type){
      toast("Please enter all details!")
      return;
    }else{
      setStep(step+1)
    }
  }

  const onCreateLink = (interview_id: string) => {
  setInterviewId(interview_id)
  setStep(step + 1) // ✅ use functional update
}


  return (
    <div className="mt-10 px-10 md:px-24 lg:px-44 xl:px-56">
      <div className="flex gap-5 items-center">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h2 className="font-bold text-2xl">Create New Interview</h2>
      </div>
      <Progress value={step * 33.33} className="my-5" />
      {step==1? <FormContainer OnHandleInputChange={OnHandleInputChange} GoToNext={ () => OnGoToNext()} /> 
      :step==2?<QuestionLists formData={ formData } onCreateLink={(interview_id)=> onCreateLink(interview_id)}/>
      :step==3?<InterviewLink interview_id={interviewId} formData={formData} />:null
      }
    </div>
  );
};

export default CreateInterview;
