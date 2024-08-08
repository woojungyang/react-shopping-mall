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

export const CommonLayout = ({
  children,
  toastMessage = "",
  setToastMessage,
  isLoading = false,
}) => {
  const { innerWidth } = window;
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;
  const location = useLocation();

  useEffect(() => {
    scrollTop();
  }, [location]);

  return (
    <div
      className={styles.container}
      style={{
        maxWidth: innerWidth,
      }}
    >
      {isLoading && <LoadingLayer />}
      <Header />
      <div className={styles.common_layout_content_wrapper}>{children}</div>
      {!isDeskTop && <BottomNavigation />}
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
