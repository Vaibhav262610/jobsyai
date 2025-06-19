import { createContext } from "react";

export interface InterviewInfo {
  userName: string;
  userEmail: string;
  interviewData: any; // You can make this more specific based on your data structure
}

interface InterviewDataContextType {
  interviewInfo: InterviewInfo | null;
  setInterviewInfo: (info: InterviewInfo) => void;
}

export const InterviewDataContext = createContext<InterviewDataContextType>({
  interviewInfo: null,
  setInterviewInfo: () => {},
});