"use client";

import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import { Video } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import InterviewCard from "../dashboard/_components/InterviewCard";

// Define InterviewType
type InterviewType = {
  jobPosition: string;
  duration: string;
  jobDescription: string;
  created_at: string;
  interview_id: string;
  type: string;
  questionList: any[]; // You can define a proper QuestionItem[] type if needed
  userEmail: string;
};

const Page = () => {
  const [interviewList, setInterviewList] = useState<InterviewType[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    const { data: Interview, error } = await supabase
      .from("Interview")
      .select("*")
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });

    if (error) {
      toast.error("Failed to fetch interviews");
      return;
    }

    setInterviewList(Interview ?? []);
  };

  return (
    <div className="my-5">
      <h2 className="font-bold text-2xl">All Previously Created Interviews</h2>

      {interviewList.length === 0 ? (
        <div className="p-5 flex flex-col gap-3 items-center mt-5">
          <Video className="h-10 w-10 text-primary" />
          <h2>You don't have any interview created!</h2>
          <Link href="/dashboard/create-interview">
            <Button className="cursor-pointer">+ Create New Interview</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
          {interviewList.map((item, index) => (
            <InterviewCard interview={item} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
