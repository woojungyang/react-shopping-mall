import React, { useEffect } from "react";

import { Device } from "models/device";
import { useNavigate } from "react-router-dom";

import useQueryString from "hooks/queryString/useQueryString";
import { useUserDevice } from "hooks/size/useUserDevice";

import MyPageContent from "components/pages/mypage/MyPageContent";
import MyPageContentMb from "components/pages/mypage/MyPageContentMb";

export default function MyPage() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  return <>{isDeskTop ? <MyPageContent /> : <MyPageContentMb />}</>;
}
