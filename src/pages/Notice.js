import React, { useEffect } from "react";

import { Device } from "models/device";

import { useUserDevice } from "hooks/size/useUserDevice";

import { MobileLayout } from "components/common";
import { MyPageLayout } from "components/pages/mypage/MyPageLayout";
import NoticeContent from "components/pages/mypage/cscenter/NoticeContent";

export default function Notice() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  return (
    <>
      {isDeskTop ? (
        <MyPageLayout>
          <NoticeContent />
        </MyPageLayout>
      ) : (
        <MobileLayout headerTitle="CS-CENTER">
          <NoticeContent />
        </MobileLayout>
      )}
    </>
  );
}
