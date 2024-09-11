import React, { useEffect, useState } from "react";

import { Device } from "models/device";

import useNoticesQuery from "hooks/query/useNoticesQuery";
import { useUserDevice } from "hooks/size/useUserDevice";

import { MobileLayout } from "components/common";
import { MyPageLayout } from "components/pages/mypage/MyPageLayout";
import NoticeContent from "components/pages/mypage/cscenter/NoticeContent";

import styles from "styles/_mypage.module.scss";

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
        <MobileLayout headerTitle="NOTICE" isFooter={true} showIcon={false}>
          <div className={styles.notice_container_mb}>
            <NoticeContent isDeskTop={isDeskTop} />
          </div>
        </MobileLayout>
      )}
    </>
  );
}
