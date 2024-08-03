import React, { useEffect, useMemo, useRef, useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import classNames from "classnames";
import { numberWithCommas } from "utilities";

import { DefaultPagination } from "components/common";

import styles from "styles/_common.module.scss";

export const Table = ({
  children,
  headers = [],
  count = 1,
  page = 1,
  pagination = true,
  filterOptions = [],
  selectedOption = "",
  onChangeOption,
}) => {
  const options = [...[{ id: "", label: "전체" }].concat(filterOptions)];

  const updateOption = useMemo(() => {
    return (
      options.find((e) => e.id == selectedOption).label || options[0].label
    );
  }, [selectedOption]);

  // console.log("selectedOption", selectedOption);

  const [showOptions, setShowOptions] = useState(false);

  const selectRef = useRef();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef]);

  return (
    <div>
      <div className={styles.table_filter_wrap}>
        {pagination && <p>총 {numberWithCommas(count)}건</p>}
        {!!filterOptions.length && (
          <div className={styles.table_select_container} ref={selectRef}>
            <div
              className={classNames({
                [styles.table_select_wrapper]: true,
                [styles.table_select_wrapper_active]: showOptions,
              })}
              onClick={() => setShowOptions(!showOptions)}
            >
              <p className={styles.table_select_placeholder}>{updateOption}</p>
              <KeyboardArrowDownIcon />
            </div>
            {showOptions && (
              <div className={styles.table_select_wrap}>
                {options.map((option, index) => (
                  <p
                    key={index}
                    onClick={(event) => {
                      event.stopPropagation();
                      onChangeOption(option.id);

                      setShowOptions(false);
                    }}
                  >
                    {option.label}
                  </p>
                ))}
              </div>
            )}
          </div>
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
      {pagination && <DefaultPagination count={count} page={page} />}
    </div>
  );
};
