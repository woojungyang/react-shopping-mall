import React from "react";

import styles from "styles/_common.module.scss";

export const TableRow = ({ children }) => {
  return <tr className={styles.table_row}>{children}</tr>;
};
