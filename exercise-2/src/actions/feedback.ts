"use server";

import {
  FeedbackErrors,
  FeedbackFormValues,
  FeedbackItem,
  SubmitFeedbackResult,
} from "@/types/feedback";

let feedbackStore: FeedbackItem[] = [];

function validateFeedback(values: FeedbackFormValues): FeedbackErrors {
  const errors: FeedbackErrors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required";
  }

  if (!values.employeeId.trim()) {
    errors.employeeId = "Employee ID is required";
  }

  if (!values.feedback.trim()) {
    errors.feedback = "Feedback is required";
  }

  return errors;
}

export async function submitFeedback(
  values: FeedbackFormValues
): Promise<SubmitFeedbackResult> {
  const cleanedValues: FeedbackFormValues = {
    name: values.name.trim(),
    employeeId: values.employeeId.trim(),
    feedback: values.feedback.trim(),
  };

  const errors = validateFeedback(cleanedValues);

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Please fill all required fields.",
      errors,
      entries: feedbackStore,
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 400));

  const newEntry: FeedbackItem = {
    id: `${Date.now()}`,
    ...cleanedValues,
    submittedAt: new Date().toISOString(),
  };

  feedbackStore = [newEntry, ...feedbackStore];

  return {
    success: true,
    message: "Feedback submitted successfully.",
    entry: newEntry,
    entries: feedbackStore,
  };
}

export async function getFeedbackList(): Promise<FeedbackItem[]> {
  return feedbackStore;
}