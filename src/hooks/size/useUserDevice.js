import React, { useEffect, useState } from "react";

import { Device, DeviceSize } from "models/device";

export const useUserDevice = () => {
  function getWindowDimensions() {
    const { innerWidth: width } = window;
    return width <= DeviceSize.Mobile
      ? Device.Mobile
      : width <= DeviceSize.Tablet
        ? Device.Table
        : Device.Desktop;
  }

  const [userDevice, setUserDevice] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => {
      setUserDevice(getWindowDimensions());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return userDevice;
};
