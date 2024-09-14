import React, { useEffect } from "react";

import { Device } from "models/device";

import { useUserDevice } from "hooks/size/useUserDevice";

import ReviewContent from "components/pages/mypage/review/ReviewContent";
import ReviewContentMb from "components/pages/mypage/review/ReviewContentMb";

export default function Review() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  return <>{isDeskTop ? <ReviewContent /> : <ReviewContentMb />}</>;
}
