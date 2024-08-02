import React from "react";

import { Device } from "models/device";

import { useUserDevice } from "hooks/size/useUserDevice";

import { ToastModal } from "components/modal";

import styles from "styles/_common.module.scss";

import BottomNavigation from "./BottomNavigation";
import Footer from "./Footer";
import Header from "./Header";

export const CommonLayout = ({ children, toastMessage = "" }) => {
  const { innerWidth } = window;
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  return (
    <div
      className={styles.container}
      style={{
        maxWidth: innerWidth,
      }}
    >
      <Header />
      <div className={styles.common_layout_content_wrapper}>{children}</div>
      {!isDeskTop && <BottomNavigation />}
      <Footer />
      {toastMessage && <ToastModal toastMessage={toastMessage} />}
    </div>
  );
};
