import React from "react";

import GradingIcon from "@mui/icons-material/Grading";
import { numberWithCommas } from "utilities";

import styles from "styles/_common.module.scss";

import { LikeHeart } from "./LikeHeart";

export const ItemFullCard = ({
  showBrand = true,
  showStatus = false,
  product = {},
  style = {
    height: product ? 480 : 400,
    maxWidth: product ? 330 : 250,
  },
}) => {
  return (
    <div className={styles.default_item_wrapper} style={style}>
      <img src={require(`assets/images/sub/sub${1}.jpg`)} />
      <LikeHeart />
      {showBrand && <p className={styles.brand_name}>BrandName</p>}
      <p className={styles.product_name}>ProductName</p>
      <div className={styles.default_flex_space} style={{ marginTop: 12 }}>
        <p className={styles.product_price}>
          {numberWithCommas(10000)} <span> {numberWithCommas(90000)}</span>
        </p>
        <p className={styles.discount_rate}>
          <span>20</span>%
        </p>
      </div>
      {showStatus && (
        <div className={styles.more_information}>
          <div className={styles.default_flex}>
            <LikeHeart
              position={{ position: "relative" }}
              defaultColor="skeleton"
            />
            <span style={{ marginRight: 10 }}>{numberWithCommas(1234)}</span>
            <GradingIcon style={{ width: 12, height: 12, color: "#6b6b6b" }} />
            <span>{numberWithCommas(1234)}</span>
          </div>
        </div>
      )}
    </div>
  );
};
