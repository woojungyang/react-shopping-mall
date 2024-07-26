import React from "react";

import classNames from "classnames";

import { ScrollableSlider } from "components/slider";

import styles from "styles/_detail.module.scss";

import { DetailContentWrapper } from "./DetailContentWrapper";

export const ColorOptions = ({
  colorOptions,
  setSelectedOptions,
  selectedItemOptions,
}) => {
  return (
    <DetailContentWrapper title="COLOR">
      <div className={styles.color_options_wrapper}>
        <p className={styles.selected_option_name}>
          {selectedItemOptions?.color}
        </p>
        <ScrollableSlider>
          {colorOptions.map((option, index) => {
            const isSelected = selectedItemOptions?.color == index;
            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedOptions({
                    ...selectedItemOptions,
                    color: isSelected ? null : index,
                  });
                }}
                className={classNames({
                  [styles.detail_color_options]: true,
                  [styles.selected_color_option]: isSelected,
                })}
              >
                <img
                  src={require("assets/images/sub/sub24.jpg")}
                  className={styles.color_option_thumbnail}
                  style={{
                    height: 90,
                    flex: "0 0 calc(6%)",
                    width: 70,
                  }}
                />
              </div>
            );
          })}
        </ScrollableSlider>
      </div>
    </DetailContentWrapper>
  );
};
