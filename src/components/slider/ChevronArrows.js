import React from "react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import styles from "styles/_common.module.scss";

export const ChevronArrows = ({
  style = { width: "100%" },
  onClickPrev = () => {},
  onClickNext = () => {},
}) => {
  const { width, iconOptions: icon } = style;
  const iconStyle = {
    width: icon?.width,
    height: icon?.height,
    color: icon?.color,
  };

  return (
    <div className={styles.chevron_wrapper} style={{ width: width || "100%" }}>
      <ArrowBackIosIcon style={iconStyle} onClick={onClickPrev} />
      <ArrowForwardIosIcon style={iconStyle} onClick={onClickNext} />
    </div>
  );
};
