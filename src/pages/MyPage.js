import React, { useEffect } from "react";

import { Device } from "models/device";

import { useUserDevice } from "hooks/size/useUserDevice";

import MyPageContentMb from "components/pages/mypage/MyPageContentMb";
import MyOrderContent from "components/pages/mypage/order/MyOrderContent";

export default function MyPage() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  return <>{isDeskTop ? <MyOrderContent /> : <MyPageContentMb />}</>;
}
