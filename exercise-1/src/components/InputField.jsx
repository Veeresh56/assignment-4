import React from "react";
import styles from "../styles/FeedbackForm.module.css";

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  textarea = false,
}) {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>

      {textarea ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${styles.textarea} ${error ? styles.errorInput : ""}`}
          rows="5"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${styles.input} ${error ? styles.errorInput : ""}`}
        />
      )}

      {error && <small className={styles.errorText}>{error}</small>}
    </div>
  );
}

export default InputField;