import React from "react";

import { numberWithCommas } from "utilities";

import styles from "styles/_common.module.scss";

import { LikeHeart } from "./LikeHeart";

export const ItemCard = ({
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
      <p className={styles.brand_name}>BrandName</p>
      <p className={styles.product_name}>ProductName</p>
      <div className={styles.default_flex_space} style={{ marginTop: 16 }}>
        <p className={styles.product_price}>
          {numberWithCommas(10000)} <span> {numberWithCommas(90000)}</span>
        </p>
        <p className={styles.discount_rate}>
          <span>20</span>%
        </p>
      </div>
    </div>
  );
};
