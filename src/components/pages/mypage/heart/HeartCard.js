import React from "react";

import DisplaySettingsOutlinedIcon from "@mui/icons-material/DisplaySettingsOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { getDiscountPercent, numberWithCommas } from "utilities";

import { LikeHeart } from "components/card";

import styles from "styles/_mypage.module.scss";

export const HeartCard = ({ item = {}, isExpansion = false }) => {
  const navigation = useNavigate();
  return (
    <div
      className={classNames({
        [styles.heart_card_item_wrap]: true,
        [styles.expansion_card]: isExpansion,
      })}
    >
      <div className={styles.item_thumbnail}>
        <LikeHeart
          like={true}
          position={
            isExpansion
              ? { right: "15%", top: "3%" }
              : { right: "15%", top: "3%" }
          }
        />
        <img
          src={item?.thumbnail}
          onClick={() => navigation(`/items/${item.id}`)}
        />
      </div>
      <div className={styles.item_info_wrap}>
        <div>
          <p className={styles.brand_name}>{item?.brandName}</p>
          <p className={styles.item_name}>{item?.itemName}</p>
          <div className={styles.price_info_wrap}>
            <p className={styles.current_price}>
              {numberWithCommas(item?.price)}원{" "}
              <span className={styles.original_price}>
                {numberWithCommas(item?.originalPrice)}원
              </span>
            </p>

            <p className={styles.sale_percent}>
              {getDiscountPercent(item?.price, item?.originalPrice)}%
            </p>
          </div>
        </div>

        {item?.isSoldOut ? (
          <p
            className={classNames({
              [styles.add_cart_button]: true,
              [styles.sold_out_button]: true,
            })}
          >
            품절
          </p>
        ) : (
          <div
            className={classNames({
              [styles.flex_button_wrap]: !isExpansion,
            })}
          >
            <p className={styles.add_cart_button}>
              <DisplaySettingsOutlinedIcon />
              옵션
            </p>
            <p className={styles.add_cart_button}>
              <LocalMallOutlinedIcon />
              쇼핑백
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
