"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define the data structure
interface InterviewData {
  jobPosition: string;
  jobDescription: string;
  duration: string;
  type: string;
  [key: string]: any; // add this to support additional data
}

interface InterviewContextType {
  interviewInfo: {
    userName: string;
    userEmail: string;
    interviewData: InterviewData | null;
  };
  setInterviewInfo: (info: {
    userName: string;
    userEmail: string;
    interviewData: InterviewData;
  }) => void;
}

// Default values
const defaultState: InterviewContextType = {
  interviewInfo: {
    userName: "",
    userEmail: "",
    interviewData: null,
  },
  setInterviewInfo: () => {},
};

// Create context
const InterviewDataContext = createContext<InterviewContextType>(defaultState);

// Provider component
export const InterviewDataProvider = ({ children }: { children: ReactNode }) => {
  const [interviewInfo, setInterviewInfoState] = useState(defaultState.interviewInfo);

  const setInterviewInfo = (info: InterviewContextType["interviewInfo"]) => {
    setInterviewInfoState(info);
  };

  return (
    <InterviewDataContext.Provider value={{ interviewInfo, setInterviewInfo }}>
      {children}
    </InterviewDataContext.Provider>
  );
};

// Custom hook
export const useInterviewData = () => useContext(InterviewDataContext);
