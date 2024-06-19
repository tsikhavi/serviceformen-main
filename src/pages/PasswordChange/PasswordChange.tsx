import { useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./PasswordChange.module.sass";

const PasswordChange = () => {
  const { t } = useTranslation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your password change logic here
    console.log("Current Password:", currentPassword);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
    // Reset form fields
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className={styles.content}>
      <div className={styles.title}>{t("passwordChange.title")}</div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="currentPassword" className={styles.label}>
            {t("passwordChange.currentPassword")}
          </label>
          <input
            type="password"
            id="currentPassword"
            className={styles.input}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="newPassword" className={styles.label}>
            {t("passwordChange.newPassword")}
          </label>
          <input
            type="password"
            id="newPassword"
            className={styles.input}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            {t("passwordChange.confirmPassword")}
          </label>
          <input
            type="password"
            id="confirmPassword"
            className={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          {t("passwordChange.submit")}
        </button>
      </form>
    </div>
  );
};

export default PasswordChange;
