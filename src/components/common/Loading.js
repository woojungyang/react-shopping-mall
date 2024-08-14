import React from "react";

import { CircularProgress } from "@mui/material";

import styles from "styles/_common.module.scss";

export const Loading = () => {
  return (
    <div className={styles.circular_process_wrapper}>
      <CircularProgress size="2rem" style={{ color: "#f89b00" }} />
    </div>
  );
};
