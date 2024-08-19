import React, { useEffect } from "react";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollTop } from "utilities";

import styles from "styles/_common.module.scss";

import BottomNavigation from "./BottomNavigation";
import Footer from "./Footer";
import ScrollNavigation from "./ScrollNavigation";

export const MobileLayout = ({
  headerTitle = "",
  children,
  showIcon = true,
  isFooter = false,
  isBottomNavigation = false,
  currentTab = "/",
}) => {
  const navigation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    scrollTop();
  }, [location]);

  return (
    <div className={styles.mobile_container}>
      <div className={styles.header_wrapper}>
        <KeyboardBackspaceIcon onClick={() => navigation(-1)} />
        <p>{headerTitle}</p>
        {showIcon && (
          <OtherHousesOutlinedIcon onClick={() => navigation("/")} />
        )}
      </div>
      {children}
      <ScrollNavigation />
      {isBottomNavigation && <BottomNavigation currentTab={currentTab} />}
      {isFooter && <Footer />}
    </div>
  );
};
