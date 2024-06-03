import React from "react";

import styles from "styles/_common.module.scss";

import Header from "./Header";

export const CommonLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  );
};
