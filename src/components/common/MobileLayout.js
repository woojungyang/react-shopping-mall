import React from "react";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import { useNavigate } from "react-router-dom";

import styles from "styles/_common.module.scss";

export const MobileLayout = ({
  headerTitle = "",
  children,
  showIcon = true,
}) => {
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
    </div>
  );
};
