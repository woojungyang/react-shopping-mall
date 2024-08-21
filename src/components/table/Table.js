import React from "react";

import { numberWithCommas } from "utilities";

import { DefaultPagination } from "components/common";

import styles from "styles/_common.module.scss";

import { TableFilter } from "./TableFilter";

export const Table = ({
  children,
  headers = [],
  count = 1,
  total = 1,
  page = 1,
  pagination = true,
  filterOptions = [],
  selectedOption = "",
  onChangeOption,
  handleChangePage,
}) => {
  return (
    <div>
      <div className={styles.table_filter_wrap}>
        {pagination && <p>전체 {numberWithCommas(total)}건</p>}
        {!!filterOptions.length && (
          <TableFilter
            filterOptions={filterOptions}
            selectedOption={selectedOption}
            onClick={(id) => onChangeOption(id)}
          />
        )}
      </div>
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
      {pagination && total > 0 && (
        <DefaultPagination
          count={count}
          page={page}
          onChange={handleChangePage}
        />
      )}
    </div>
  );
};
