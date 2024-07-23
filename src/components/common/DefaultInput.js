import React from "react";

import { Device } from "models/device";

import { useUserDevice } from "hooks/size/useUserDevice";

import styles from "styles/_common.module.scss";

export const DefaultInput = ({
  name = "",
  placeholder = "",
  value,
  onChange,
  icon,
  iconClick = () => {},
  type = "text",
}) => {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  return (
    <div
      className={styles.default_input_wrapper}
      style={{ height: isDeskTop ? 48 : 38 }}
    >
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <div onClick={iconClick}> {icon}</div>
    </div>
  );
};
