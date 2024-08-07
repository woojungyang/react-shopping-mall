import React from "react";

import { numberWithCommas } from "utilities";

import styles from "styles/_common.module.scss";

import { LikeHeart } from "./LikeHeart";

export const SmallCard = ({ item = {} }) => {
  return (
    <div className={styles.brand_item_wrapper}>
      <img src={item?.thumbnail} alt="" />
      <div className={styles.brand_item_info}>
        <div className={styles.item_info}>
          <p className={styles.brand_name}>{item?.brandName}</p>
          <p className={styles.brand_item_name}>{item?.itemName}</p>
        </div>
        <div className={styles.price_info}>
          <p className={styles.default_flex}>
            <p className={styles.original_price}>
              {numberWithCommas(item?.originalPrice)}
            </p>
            원{" "}
            <p className={styles.current_price}>
              {numberWithCommas(item?.price)}원
            </p>
          </p>
          <span className={styles.sale_percent}>
            {(
              ((item?.originalPrice - item?.price) / item?.originalPrice) *
              100
            ).toFixed(0)}
            %
          </span>
        </div>
        <LikeHeart
          like={item?.like}
          defaultColor="skeleton"
          position={{ top: "10%", right: "0%" }}
        />
      </div>
    </div>
  );
};
