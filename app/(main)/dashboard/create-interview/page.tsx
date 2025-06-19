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
  jobPosition: string;
  jobDescription: string;
  duration: string;
  type: string;
  [key: string]: any;
};

const CreateInterview: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    jobPosition: "",
    jobDescription: "",
    duration: "",
    type: "",
  });
  const [interviewId, setInterviewId] = useState<string | null>(null);

  const OnHandleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const OnGoToNext = async () => {
    const credits = await supabase
      .from("Users")
      .select("credits")
      .eq("email", user?.email);

    if (!credits.data || credits.data[0]?.credits <= 0) {
      toast("Please Add Credits!");
      return;
    }

    await supabase
      .from("Users") // ✅ fixed table name from 'User' to 'Users'
      .update({ credits: Number(credits.data[0].credits) - 1 })
      .eq("email", user?.email);

    if (
      !formData?.jobPosition ||
      !formData?.jobDescription ||
      !formData?.duration ||
      !formData?.type
    ) {
      toast("Please enter all details!");
      return;
    } else {
      setStep(step + 1);
    }
  };

  const onCreateLink = (interview_id: string) => {
    setInterviewId(interview_id);
    setStep(3);
  };

  return (
    <div className="mt-10 px-10 md:px-24 lg:px-44 xl:px-56">
      <div className="flex gap-5 items-center">
        <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
        <h2 className="font-bold text-2xl">Create New Interview</h2>
      </div>
      <Progress value={step * 33.33} className="my-5" />
      {step === 1 ? (
        <FormContainer
          OnHandleInputChange={OnHandleInputChange}
          GoToNext={OnGoToNext}
        />
      ) : step === 2 ? (
        <QuestionLists formData={formData} onCreateLink={onCreateLink} />
      ) : step === 3 && interviewId !== null ? (
        <InterviewLink interview_id={interviewId} formData={formData} />
      ) : null}
    </div>
  );
};

export default CreateInterview;
