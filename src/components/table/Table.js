import React from "react";

import { DefaultPagination } from "components/common";

import styles from "styles/_common.module.scss";

import { TableHeader } from "./TableHeader";

export const Table = ({ children, headers = [], count = 1, page = 1 }) => {
  return (
    <div>
      <table className={styles.table_container}>
        <thead className={styles.table_header}>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                style={{
                  width: header?.width || "auto",
                  maxWidth: header?.width || "none",
                }}
              >
                {header?.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      <DefaultPagination count={count} page={page} />
    </div>
  );
};
