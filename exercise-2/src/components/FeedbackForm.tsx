"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { submitFeedback } from "@/actions/feedback";
import styles from "./FeedbackForm.module.css";
import {
  FeedbackErrors,
  FeedbackFormValues,
  FeedbackItem,
} from "@/types/feedback";

const initialFormData: FeedbackFormValues = {
  name: "",
  employeeId: "",
  feedback: "",
};

export default function FeedbackForm() {
  const [formData, setFormData] = useState<FeedbackFormValues>(initialFormData);
  const [errors, setErrors] = useState<FeedbackErrors>({});
  const [submittedData, setSubmittedData] = useState<FeedbackItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateClientSide = (): FeedbackErrors => {
    const newErrors: FeedbackErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.employeeId.trim()) {
      newErrors.employeeId = "Employee ID is required";
    }

    if (!formData.feedback.trim()) {
      newErrors.feedback = "Feedback is required";
    }

    return newErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const clientErrors = validateClientSide();
    setErrors(clientErrors);

    if (Object.keys(clientErrors).length > 0) {
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await submitFeedback(formData);

      if (!response.success) {
        setErrors(response.errors ?? {});
        return;
      }

      if (response.entry) {
        setSubmittedData(response.entry);
      }

      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong while submitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnotherSubmission = () => {
    setSubmittedData(null);
    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        {!submittedData ? (
          <div className={styles.formCard}>
            <div className={styles.header}>
              <h1 className={styles.heading}>Employee Feedback Form</h1>
              <p className={styles.subheading}>
                Share your experience and help us improve.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`${styles.input} ${
                    errors.name ? styles.errorInput : ""
                  }`}
                />
                {errors.name && (
                  <small className={styles.errorText}>{errors.name}</small>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="employeeId" className={styles.label}>
                  Employee ID
                </label>
                <input
                  id="employeeId"
                  name="employeeId"
                  type="text"
                  value={formData.employeeId}
                  onChange={handleChange}
                  placeholder="Enter your employee ID"
                  className={`${styles.input} ${
                    errors.employeeId ? styles.errorInput : ""
                  }`}
                />
                {errors.employeeId && (
                  <small className={styles.errorText}>{errors.employeeId}</small>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="feedback" className={styles.label}>
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  placeholder="Write your feedback here..."
                  className={`${styles.textarea} ${
                    errors.feedback ? styles.errorInput : ""
                  }`}
                  rows={5}
                />
                {errors.feedback && (
                  <small className={styles.errorText}>{errors.feedback}</small>
                )}
              </div>

              <button
                type="submit"
                className={styles.primaryButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </button>
            </form>
          </div>
        ) : (
          <div className={styles.successCard}>
            <div className={styles.successBadge}>✓ Submitted Successfully</div>

            <h2 className={styles.successTitle}>
              Thank you, {submittedData.name}!
            </h2>

            <p className={styles.successSubtitle}>
              Your feedback has been submitted successfully.
            </p>

            <div className={styles.detailsGrid}>
              <div className={styles.detailBox}>
                <span className={styles.detailLabel}>Employee ID</span>
                <p className={styles.detailValue}>{submittedData.employeeId}</p>
              </div>

              <div className={styles.detailBox}>
                <span className={styles.detailLabel}>Feedback</span>
                <p className={styles.detailValue}>{submittedData.feedback}</p>
              </div>
            </div>

            <button
              className={styles.secondaryButton}
              onClick={handleAnotherSubmission}
            >
              Another Submission
            </button>
          </div>
        )}
      </div>
    </div>
  );
}