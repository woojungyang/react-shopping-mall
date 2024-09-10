import React, { useEffect, useMemo, useRef, useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import classNames from "classnames";

import styles from "styles/_common.module.scss";

export const TableFilter = ({
  filterOptions = [],
  selectedOption = "",
  onClick,
  placeholder = "",
}) => {
  const options = [...[{ id: "", label: "전체" }].concat(filterOptions)];
  const updateOption = useMemo(() => {
    return (
      options.find((e) => e.id == selectedOption)?.label || options[0]?.label
    );
  }, [selectedOption]);

  const [showOptions, setShowOptions] = useState(false);

  const selectRef = useRef(null);
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
                onClick(option.id);
                setShowOptions(false);
              }}
            >
              {option.label}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
