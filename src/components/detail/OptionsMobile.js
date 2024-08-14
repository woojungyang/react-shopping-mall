import React, { useEffect, useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import classNames from "classnames";

import { DefaultButton } from "components/common";

import styles from "styles/_common.module.scss";

import { QuantityOptions } from "./QuantityOptions";

export const OptionsMobile = ({
  leftButton = {},
  rightButton = {},
  setVisible,
  isQuantity = true,
  options = [],
  selectedItemOptions,
  setSelectedItemOptions,
  setToastMessage,
}) => {
  const [showOptions, setShowOptions] = useState(false);

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

  useEffect(() => {
    if (!!selectedItemOptions?.quantity) {
      if (selectedItemOptions?.quantity > selectedItemOptions.inventory) {
        setToastMessage(
          `최대 구매 가능한 수량은 \n${selectedItemOptions?.inventory}개 입니다.`,
        );
        setSelectedItemOptions({
          ...selectedItemOptions,
          quantity: selectedItemOptions.inventory,
        });
      }
    }
  }, [selectedItemOptions]);

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
            {options?.find((item) => item.id == selectedItemOptions.id)?.name ||
              "옵션선택"}
          </p>
          <KeyboardArrowDownIcon />
          {showOptions && (
            <div className={styles.select_box_options_wrapper}>
              {options?.map((option, index) => (
                <p
                  key={index}
                  className={classNames({
                    [styles.select_box_option]: true,
                    [styles.select_box_option_disabled]: option.inventory == 0,
                  })}
                  onClick={() => {
                    if (option.inventory > 0) setSelectedItemOptions(option);
                    else setShowOptions(true);
                  }}
                >
                  {option.name}
                </p>
              ))}
            </div>
          )}
        </div>
        {isQuantity && (
          <QuantityOptions
            setSelectedItemOptions={setSelectedItemOptions}
            selectedItemOptions={selectedItemOptions}
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
