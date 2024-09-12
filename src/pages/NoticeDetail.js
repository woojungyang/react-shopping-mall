import React from "react";

import { Device } from "models/device";

import { useUserDevice } from "hooks/size/useUserDevice";

import { MobileLayout } from "components/common";
import { MyPageLayout } from "components/pages/mypage/MyPageLayout";
import NoticeContentDetail from "components/pages/mypage/cscenter/NoticeContentDetail";

import styles from "styles/_mypage.module.scss";

export default function NoticeDetail() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  return (
    <>
      {isDeskTop ? (
        <MyPageLayout>
          <NoticeContentDetail />
        </MyPageLayout>
      ) : (
        <MobileLayout isFooter={true} showIcon={false} headerTitle="공지사항">
          <div className={styles.notice_container_mb}>
            <NoticeContentDetail isDeskTop={isDeskTop} />
          </div>
        </MobileLayout>
      )}
    </>
  );
}
