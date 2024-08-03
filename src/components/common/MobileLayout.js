import React, { useEffect, useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import { useNavigate } from "react-router-dom";
import { scrollBottom, scrollTop } from "utilities";

import styles from "styles/_common.module.scss";

import BottomNavigation from "./BottomNavigation";
import Footer from "./Footer";

export const MobileLayout = ({
  headerTitle = "",
  children,
  showIcon = true,
  isFooter = false,
  isBottomNavigation = false,
}) => {
  const [position, setPosition] = useState(0);
  const switchPosition = position > 50;
  function onScroll() {
    setPosition(window.scrollY);
  }
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navigation = useNavigate();
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
      {switchPosition && (
        <>
          <div className={styles.mobile_scroll_top_button} onClick={scrollTop}>
            <KeyboardArrowUpIcon />
          </div>
          <div
            className={styles.mobile_scroll_top_button}
            style={{ bottom: 35 }}
            onClick={scrollBottom}
          >
            <KeyboardArrowDownIcon />
          </div>
        </>
      )}
      {isBottomNavigation && <BottomNavigation />}
      {isFooter && <Footer />}
    </div>
  );
};
