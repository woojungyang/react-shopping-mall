import React from "react";

import { Device } from "models/device";

import { useUserDevice } from "hooks/size/useUserDevice";

import styles from "styles/_button.module.scss";

export const DefaultButton = ({
  label = "",
  onClick = () => {
    alert("준비중입니다.");
  },
  className = "",
  children,
}) => {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  const style = isDeskTop ? { height: 48 } : { height: 38, fontSize: "0.85em" };

  return (
    <button
      onClick={onClick}
      className={className || styles.button_dark_300_color_background_100}
      style={style}
    >
      {label || children}
    </button>
  );
};
