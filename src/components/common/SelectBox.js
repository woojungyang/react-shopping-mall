import React, { useState } from "react";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import styles from "styles/_common.module.scss";

export const SelectBox = ({
  options = [],
  onChange,
  selectedValue = "",
  style = {},
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const selectedOptionLabel = options.find(
    (option) => option.sort == selectedValue,
  );
  return (
    <div
      className={styles.select_box_container}
      onClick={() => setShowOptions(!showOptions)}
    >
      <div className={styles.selected_value}>
        <p> {selectedOptionLabel?.label}</p>
        <ArrowDropDownIcon />
      </div>
      {showOptions && (
        <div className={styles.select_options_wrap} style={style}>
          {options?.map((option, index) => (
            <p
              key={index}
              onClick={() => onChange(option.sort)}
              style={
                selectedValue == option.sort
                  ? {
                      backgroundColor: "black",
                      color: "white",
                    }
                  : {}
              }
            >
              {option.label}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
