export type FeedbackFormValues = {
  name: string;
  employeeId: string;
  feedback: string;
};

export type FeedbackErrors = Partial<Record<keyof FeedbackFormValues, string>>;

export type FeedbackItem = FeedbackFormValues & {
  id: string;
  submittedAt: string;
};

export type SubmitFeedbackResult = {
  success: boolean;
  message: string;
  entry?: FeedbackItem;
  entries?: FeedbackItem[];
  errors?: FeedbackErrors;
};