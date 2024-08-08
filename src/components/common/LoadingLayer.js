import React from "react";

import { CircularProgress } from "@mui/material";

import styles from "styles/_common.module.scss";

export const LoadingLayer = () => {
  return (
    <div className={styles.loading_wrapper}>
      <CircularProgress size="5rem" style={{ color: "#f89b00" }} />
    </div>
  );
};
