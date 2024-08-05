import React, { useEffect, useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { DefaultButton } from "components/common";

import styles from "styles/_common.module.scss";

import { QuantityOptions } from "./QuantityOptions";

export const OptionsMobile = ({
  leftButton = {},
  rightButton = {},
  setVisible,
  setOptionChanges,
  optionsChanges,
  isQuantity = true,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const [itemOptions, setItemOptions] = useState(
    Array.from({ length: 4 }, (v, index) => ({
      id: index,
      name: "item" + index,
    })),
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showOptions &&
        !document
          .querySelector(`.${styles.select_box_options_wrapper}`)
          .contains(event.target) &&
        !document
          .querySelector(`.${styles.options_select_box}`)
          .contains(event.target)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  return (
    <div
      className={styles.mobile_options_container}
      onClick={() => setVisible(false)}
    >
      <div
        className={styles.options_wrapper}
        onClick={(e) => e.stopPropagation()}
      >
        <p className={styles.options_title}>옵션/수량</p>
        <div
          className={styles.options_select_box}
          onClick={() => {
            setShowOptions(!showOptions);
          }}
        >
          <p>
            {!optionsChanges?.option
              ? "옵션 선택"
              : itemOptions?.find((item) => item.id == optionsChanges?.option)
                  .name}
          </p>
          <KeyboardArrowDownIcon />
          {showOptions && (
            <div className={styles.select_box_options_wrapper}>
              {itemOptions?.map((itemOption, index) => (
                <p
                  key={index}
                  className={styles.select_box_option}
                  onClick={() => {
                    setOptionChanges({
                      ...optionsChanges,
                      option: itemOption.id,
                    });
                  }}
                >
                  {itemOption.name}
                </p>
              ))}
            </div>
          )}
        </div>
        {isQuantity && (
          <QuantityOptions
            setSelectedOptions={setOptionChanges}
            selectedItemOptions={optionsChanges}
          />
        )}

        <div className={styles.options_button_warp}>
          <DefaultButton
            className={styles.button_background_100_outline_color_dark_300}
            label={leftButton?.label}
            onClick={leftButton?.onClick}
          />
          <DefaultButton
            label={rightButton?.label}
            onClick={rightButton?.onClick}
          />
        </div>
      </div>
    </div>
  );
};
