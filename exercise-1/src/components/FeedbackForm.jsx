import React, { useState } from "react";
import InputField from "./InputField";
import SubmittedData from "./SubmittedData";
import styles from "../styles/FeedbackForm.module.css";

function FeedbackForm() {
  const initialFormData = {
    name: "",
    employeeId: "",
    feedback: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (event) => {
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

  const validateForm = () => {
    const newErrors = {};

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(formData);
      setFormData(initialFormData);
    }
  };

  const handleReset = () => {
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
              {/* <p className={styles.topText}>Employee Review Portal</p> */}
              <h1 className={styles.heading}>Feedback Form</h1>
              <p className={styles.subheading}>
                Share your experience and help us improve.
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <InputField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                error={errors.name}
              />

              <InputField
                label="Employee ID"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                placeholder="Enter your employee ID"
                error={errors.employeeId}
              />

              <InputField
                label="Feedback"
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                placeholder="Write your feedback here..."
                onSubmit={handleSubmit}
                error={errors.feedback}
                textarea={true}
              />

              <button type="submit" className={styles.primaryButton}>
                Submit Feedback
              </button>
            </form>
          </div>
        ) : (
          <SubmittedData data={submittedData} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}

export default FeedbackForm;