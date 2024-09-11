import React from "react";

import classNames from "classnames";
import { Device } from "models/device";
import { getDiscountPercent, numberWithCommas } from "utilities";

import { useUserDevice } from "hooks/size/useUserDevice";

import styles from "styles/_common.module.scss";

import { LikeHeart } from "./LikeHeart";

export const SmallCard = ({ item = {}, showBrand = true }) => {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;
  return (
    <div
      className={classNames({
        [styles.small_item_card_container]: true,
        [styles.small_item_card_container_mb]: !isDeskTop,
      })}
    >
      <img src={item?.thumbnail} alt="" />
      <div className={styles.brand_item_info}>
        <div className={styles.item_info}>
          {showBrand && <p className={styles.brand_name}>{item?.brandName}</p>}
          <p className={styles.brand_item_name}>{item?.itemName}</p>
        </div>
        <div className={styles.price_info}>
          <div className={styles.default_flex}>
            <p className={styles.original_price}>
              <span> {numberWithCommas(item?.originalPrice)}</span>원
            </p>
            <p className={styles.current_price}>
              {numberWithCommas(item?.price)}원
            </p>
          </div>
          <span className={styles.sale_percent}>
            {getDiscountPercent(item?.price, item?.originalPrice)}%
          </span>
        </div>
        <LikeHeart
          like={item?.like}
          defaultColor="skeleton"
          position={{ top: "10%", right: isDeskTop ? "0%" : "3%" }}
        />
      </div>
    </div>
  );
};
