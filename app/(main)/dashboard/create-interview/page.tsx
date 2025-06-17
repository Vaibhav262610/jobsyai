"use client";

import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import FormContainer from "./_components/FormContainer";
import QuestionLists from "./_components/QuestionLists";
import { toast } from "sonner";

type FormData = {
  [key: string]: any;
};

const CreateInterview: React.FC = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({});

  const OnHandleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const OnGoToNext = () => {
    if(!formData?.jobPosition || !formData?.jobDescription || !formData?.duration || !formData?.type){
      toast("Please enter all details!")
      return ;
    }else{
      setStep(step+1)
    }
  }

  return (
    <div className="mt-10 px-10 md:px-24 lg:px-44 xl:px-56">
      <div className="flex gap-5 items-center">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h2 className="font-bold text-2xl">Create New Interview</h2>
      </div>
      <Progress value={step * 33.33} className="my-5" />
      {step==1? <FormContainer OnHandleInputChange={OnHandleInputChange} GoToNext={ () => OnGoToNext()} /> 
      :step==2?<QuestionLists formData={ formData }/>:null}
    </div>
  );
};

export default CreateInterview;
