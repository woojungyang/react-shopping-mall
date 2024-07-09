import React from "react";

import styles from "styles/_common.module.scss";

import Footer from "./Footer";
import Header from "./Header";

export const CommonLayout = ({ children }) => {
  const { innerWidth } = window;

  return (
    <div className={styles.container} style={{ maxWidth: innerWidth }}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
