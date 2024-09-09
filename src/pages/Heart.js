import React, { useEffect } from "react";

import { Device } from "models/device";

import { useUserDevice } from "hooks/size/useUserDevice";

import HeartContent from "components/pages/mypage/heart/HeartContent";
import HeartContentMb from "components/pages/mypage/heart/HeartContentMb";

export default function Heart() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  return <>{isDeskTop ? <HeartContent /> : <HeartContentMb />}</>;
}
