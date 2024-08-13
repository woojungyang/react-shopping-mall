import React, { useState } from "react";

import { Device } from "models/device";

import useOverviewQuery from "hooks/query/useOverviewQuery";
import { useUserDevice } from "hooks/size/useUserDevice";

import { CommonLayout } from "components/common";
import { ToastModal } from "components/modal";
import MainContent from "components/pages/main/MainContent";
import MainContentMb from "components/pages/main/MainContentMb";

export default function Main() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  const [toastMessage, setToastMessage] = useState("");

  const { data, isLoading } = useOverviewQuery({
    onError: (error) => {
      setToastMessage(error.message);
    },
  });

  return (
    <CommonLayout
      toastMessage={toastMessage}
      isLoading={isLoading}
      currentTab="/"
    >
      {isDeskTop ? <MainContent data={data} /> : <MainContentMb data={data} />}
    </CommonLayout>
  );
}
