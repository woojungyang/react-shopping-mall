import React, { useEffect } from "react";

import { Device } from "models/device";

import { useUserDevice } from "hooks/size/useUserDevice";

import MyOrderContent from "components/pages/mypage/order/MyOrderContent";
import MyOrderContentMb from "components/pages/mypage/order/MyOrderContentMb";

export default function MyOrder() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  return <>{isDeskTop ? <MyOrderContent /> : <MyOrderContentMb />}</>;
}
