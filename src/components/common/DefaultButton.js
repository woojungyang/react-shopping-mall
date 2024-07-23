import React from "react";

import { Device } from "models/device";

import { useUserDevice } from "hooks/size/useUserDevice";

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
    <button onClick={onClick} className={className} style={style}>
      {label || children}
    </button>
  );
};
