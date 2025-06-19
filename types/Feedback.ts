export type FeedbackType = {
  userEmail: string;
  userName: string;
  created_at: string;
  feedback: {
    rating: {
      technicalSkills: number;
      communication: number;
      problemSolving: number;
      experience: number;
    };
    summery: string;
    Recommendation: string;
    RecommendationMsg: string;
  };
};
