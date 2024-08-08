import React, { useEffect, useRef, useState } from "react";

import GradingIcon from "@mui/icons-material/Grading";
import { useNavigate } from "react-router-dom";
import { getDiscountPercent, numberWithCommas } from "utilities";

import styles from "styles/_common.module.scss";

import { LikeHeart } from "./LikeHeart";

export const ItemCard = ({
  showBrand = true,
  showStatus = false,
  showOriginalPrice = true,
  item,
  style = {},
}) => {
  const navigation = useNavigate();
  const contentRef = useRef(null);

  const [cardHeight, setCardHeight] = useState(50);

  useEffect(() => {
    setCardHeight(style.height - contentRef.current.clientHeight);
  }, [contentRef?.current]);

  return (
    <div
      className={styles.default_item_card_container}
      style={style}
      onClick={() => navigation(`/items/${item?.id}`)}
    >
      <LikeHeart />

      <div
        style={{
          minHeight: cardHeight,
          height: "100%",
          display: "flex",
          flex: 1,
          flexGrow: 1,
        }}
      >
        <img src={item?.thumbnail} className={styles.item_image} />
      </div>

      <div className={styles.item_card_information} ref={contentRef}>
        {showBrand && (
          <p className={styles.item_brand_name}>{item?.brandName}</p>
        )}
        <p
          className={styles.item_product_name}
          style={{ marginTop: showBrand ? "10px" : "0.5em" }}
        >
          {item?.itemName}
        </p>
        <div className={styles.default_flex_space} style={{ marginTop: 20 }}>
          <p className={styles.product_price}>
            {numberWithCommas(item?.price)}원
            {showOriginalPrice && (
              <span> {numberWithCommas(item?.originalPrice)}원</span>
            )}
          </p>
          <p className={styles.discount_rate}>
            <span>{getDiscountPercent(item?.price, item?.originalPrice)}</span>%
          </p>
        </div>
        {showStatus && (
          <div className={styles.more_item_information}>
            <div className={styles.default_flex}>
              <LikeHeart
                position={{ position: "relative" }}
                defaultColor="skeleton"
                like={item?.like}
              />
              <span style={{ marginRight: 10 }}>
                {numberWithCommas(item?.reviewCount)}
              </span>
              <GradingIcon
                style={{ width: "0.65em", height: "0.65em", color: "#6b6b6b" }}
              />
              <span>{numberWithCommas(item?.likeCount)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
