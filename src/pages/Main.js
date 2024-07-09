import React from "react";

import { Device } from "models/device";

import { useUserDevice } from "hooks/size/useUserDevice";

import { CommonLayout } from "components/common";
import MainContent from "components/pages/main/MainContent";
import MainContentMb from "components/pages/main/MainContentMb";

export default function Main() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  return (
    <CommonLayout>
      {isDeskTop ? <MainContent /> : <MainContentMb />}
    </CommonLayout>
  );
}
