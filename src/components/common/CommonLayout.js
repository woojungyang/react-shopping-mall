import React, { useEffect } from "react";

import { Device } from "models/device";
import { useLocation } from "react-router-dom";
import { scrollTop } from "utilities";

import { useUserDevice } from "hooks/size/useUserDevice";

import { ToastModal } from "components/modal";

import styles from "styles/_common.module.scss";

import BottomNavigation from "./BottomNavigation";
import Footer from "./Footer";
import Header from "./Header";
import { LoadingLayer } from "./LoadingLayer";
import ScrollNavigation from "./ScrollNavigation";

export const CommonLayout = ({
  children,
  toastMessage = "",
  setToastMessage,
  isLoading = false,
  currentTab = "",
}) => {
  const { innerWidth } = window;
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;
  const location = useLocation();

  useEffect(() => {
    scrollTop();
  }, []);

  if (isLoading) return <LoadingLayer />;

  return (
    <div
      className={styles.container}
      style={{
        maxWidth: innerWidth,
      }}
    >
      <Header />
      <div className={styles.common_layout_content_wrapper}>{children}</div>
      <ScrollNavigation />
      {!isDeskTop && <BottomNavigation currentTab={currentTab} />}
      <Footer />
      {toastMessage && (
        <ToastModal
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
        />
      )}
    </div>
  );
};
