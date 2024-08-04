import React, { useEffect } from "react";

import { Device } from "models/device";

import { useUserDevice } from "hooks/size/useUserDevice";

import MyPageContent from "components/pages/mypage/mypage/MyPageContent";
import MyPageContentMb from "components/pages/mypage/mypage/MyPageContentMb";

export default function MyPage() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  return <>{isDeskTop ? <MyPageContent /> : <MyPageContentMb />}</>;
}
