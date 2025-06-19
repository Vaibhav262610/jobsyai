import { FeedbackType } from './Feedback';

export type InterviewDetailsType = {
  jobPosition: string;
  duration: string;
  jobDescription: string;
  type: string;
  questionList: QuestionItem[]; // you can improve this later
  created_at: string;
  interview_id: string;
  Feedback: FeedbackType[];
};

export type QuestionItem = {
  question: string;
  [key: string]: any; // optional if you expect extra fields
};