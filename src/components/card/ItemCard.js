import React from "react";

import { numberWithCommas } from "utilities";

import styles from "styles/_common.module.scss";

import { LikeHeart } from "./LikeHeart";

export const ItemCard = ({
  product = {},
  style = {
    height: 400,
    maxWidth: 250,
  },
}) => {
  return (
    <div className={styles.default_item_wrapper} style={style}>
      <img src={require(`assets/images/sub/sub${1}.jpg`)} />
      <div className={styles.icon_wrap_sm}>
        <LikeHeart />
      </div>
      <p className={styles.product_name_sm}>ProductName</p>
      <div className={styles.default_flex_space} style={{ marginTop: 5 }}>
        <p className={styles.product_price_sm}>{numberWithCommas(10000)}원</p>
        <p className={styles.discount_rate_sm}>
          <span>20</span>%
        </p>
      </div>
    </div>
  );
};
