import React, { useEffect, useState } from "react";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import classNames from "classnames";
import { Device } from "models/device";

import { useUserDevice } from "hooks/size/useUserDevice";

import styles from "styles/_common.module.scss";

export const ToastModal = ({ toastMessage = "", setToastMessage }) => {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  useEffect(() => {
    // setMessage(toastMessage);
    const timer = setTimeout(() => {
      setToastMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [toastMessage]);
  if (!toastMessage) return null;
  return (
    <div
      className={classNames({
        [styles.toast_wrapper]: isDeskTop,
        [styles.toast_wrapper_mobile]: !isDeskTop,
      })}
    >
      {isDeskTop && (
        <p className={styles.toast_title}>
          <NotificationsActiveIcon />
          알림
        </p>
      )}
      <p style={{ whiteSpace: "pre-line" }}>{toastMessage}</p>
    </div>
  );
};
