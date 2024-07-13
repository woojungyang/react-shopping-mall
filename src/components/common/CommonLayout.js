import React from "react";

import { Device } from "models/device";

import { useUserDevice } from "hooks/size/useUserDevice";

import styles from "styles/_common.module.scss";

import BottomNavigation from "./BottomNavigation";
import Footer from "./Footer";
import Header from "./Header";

export const CommonLayout = ({ children }) => {
  const { innerWidth } = window;
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  return (
    <div
      className={styles.container}
      style={{
        maxWidth: innerWidth,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <div style={{ flexGrow: 1 }}> {children}</div>
      {!isDeskTop && <BottomNavigation />}
      <Footer />
    </div>
  );
};
