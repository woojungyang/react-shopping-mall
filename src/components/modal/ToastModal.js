import React, { useEffect, useState } from "react";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

import styles from "styles/_common.module.scss";

export const ToastModal = ({ toastMessage = "" }) => {
  const [message, setMessage] = useState(toastMessage);

  useEffect(() => {
    setMessage(toastMessage);
    const timer = setTimeout(() => {
      setMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [toastMessage]);
  if (!message) return null;
  return (
    <div className={styles.toast_wrapper}>
      <p className={styles.toast_title}>
        <NotificationsActiveIcon />
        알림
      </p>
      <p>{message}</p>
    </div>
  );
};
