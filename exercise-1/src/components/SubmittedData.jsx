import React from "react";
import styles from "../styles/FeedbackForm.module.css";

function SubmittedData({ data, onReset }) {
  return (
    <div className={styles.successCard}>
      <div className={styles.successBadge}>✓ Submitted Successfully</div>

      <h2 className={styles.successTitle}>Thank you, {data.name}!</h2>
      <p className={styles.successSubtitle}>
        Your feedback has been received successfully.
      </p>

      <div className={styles.detailsGrid}>
        <div className={styles.detailBox}>
          <span className={styles.detailLabel}>Employee ID</span>
          <p className={styles.detailValue}>{data.employeeId}</p>
        </div>

        <div className={styles.detailBoxFull}>
          <span className={styles.detailLabel}>Feedback</span>
          <p className={styles.detailValue}>{data.feedback}</p>
        </div>
      </div>

      <button className={styles.secondaryButton} onClick={onReset}>
        Another Submission
      </button>
    </div>
  );
}

export default SubmittedData;