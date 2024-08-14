import React from "react";

import classNames from "classnames";

import styles from "styles/_detail.module.scss";

import { DetailContentWrapper } from "./DetailContentWrapper";

export const ColorOptions = ({
  colorOptions,
  setSelectedItemOptions,
  selectedItemOptions,
}) => {
  return (
    <DetailContentWrapper title="COLOR">
      <div className={styles.color_options_wrapper}>
        <p className={styles.selected_option_name}>
          {
            colorOptions?.find(
              (color) => color.color == selectedItemOptions.color,
            )?.color
          }
        </p>

        <div className={styles.color_options_wrap}>
          {colorOptions.map((option, index) => {
            const isSelected = selectedItemOptions?.color == option.color;
            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedItemOptions({
                    ...selectedItemOptions,
                    color: isSelected ? null : option.color,
                  });
                }}
                className={classNames({
                  [styles.detail_color_options]: true,
                  [styles.selected_color_option]: isSelected,
                })}
              >
                <img
                  src={option?.thumbnail}
                  className={styles.color_option_thumbnail}
                  style={{
                    height: 90,
                    width: 70,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </DetailContentWrapper>
  );
};
