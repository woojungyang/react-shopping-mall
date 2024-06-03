import React from "react";

import { numberWithCommas } from "utilities";

import { LikePin } from "components/common";

import styles from "styles/_common.module.scss";

export const SmallCard = ({ item }) => {
  return (
    <div className={styles.brand_item_wrapper}>
      <img src={require(`assets/images/sub/sub11.jpg`)} alt="" />
      <div>
        <p className={styles.brand_name}>brandName</p>
        <p className={styles.brand_item_name}>
          [brandname] itemNameitemNameitemName itemName itemNameitemName
        </p>
        <p className={styles.price_info}>
          <span className={styles.original_price}>
            {numberWithCommas(10000)}
          </span>
          원{" "}
          <span className={styles.current_price}>
            {numberWithCommas(9000)}원
          </span>
          <span className={styles.sale_percent}> 15%</span>
        </p>
        <LikePin
          defaultColor="skeleton"
          position={{ top: "10%", right: "3%" }}
        />
      </div>
    </div>
  );
};
