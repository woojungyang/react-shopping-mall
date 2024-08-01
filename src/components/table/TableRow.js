import React from "react";

import styles from "styles/_common.module.scss";

export const TableRow = ({ children, cursor = true }) => {
  return (
    <tr
      style={{ cursor: cursor ? "pointer" : "auto" }}
      className={styles.table_row}
    >
      {children}
    </tr>
  );
};
