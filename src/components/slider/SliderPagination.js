import React from "react";

import styles from "styles/_common.module.scss";

export const SliderPagination = ({
  percent,
  bgColor = "",
  percentColor = "",
  customStyle = {},
}) => {
  return (
    <div
      className={styles.mb_slider_wrapper}
      style={{ backgroundColor: bgColor, ...customStyle }}
    >
      <div
        className={styles.mb_slider_percent}
        style={{
          width: percent + "%",
          backgroundColor: percentColor,
        }}
      ></div>
    </div>
  );
};
