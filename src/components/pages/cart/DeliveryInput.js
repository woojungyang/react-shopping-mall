import React from "react";

import classNames from "classnames";
import { Device } from "models/device";

import { useUserDevice } from "hooks/size/useUserDevice";

import styles from "styles/_cart.module.scss";

export default function DeliveryInput({
  name = "",
  placeholder = "",
  type = "text",
  value,
  onChange,
  disabled = false,
}) {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;
  return (
    <input
      name={name}
      type={type}
      className={classNames({
        [styles.delivery_custom_input]: true,
        [styles.delivery_custom_input_mb]: !isDeskTop,
      })}
      disabled={disabled}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
