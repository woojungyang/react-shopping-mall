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
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);

  useEffect(() => {
    setCardHeight(style.height - contentRef.current?.clientHeight || 0);
  }, [style.height]);

  function handleMouseDown(e) {
    startX.current = e.clientX;
    setIsDragging(false);
  }

  function handleMouseMove(e) {
    if (Math.abs(e.clientX - startX.current) > 10) {
      setIsDragging(true);
    }
  }

  function handleMouseUp() {
    if (!isDragging) {
      setTimeout(() => setIsDragging(false), 100);
    }
    startX.current = 0;
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className={styles.default_item_card_container}
      style={style}
      onMouseDown={handleMouseDown}
      onClick={() => !isDragging && navigation(`/items/${item?.id}`)}
    >
      <LikeHeart like={item?.like} />
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
          style={{ marginTop: showBrand ? "0.3em" : "0.5em" }}
        >
          {item?.itemName}
        </p>
        <div className={styles.default_flex_space} style={{ marginTop: 14 }}>
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
              />
              <span style={{ marginRight: 10 }}>
                {numberWithCommas(item?.reviewCount)}
              </span>
              <GradingIcon
                style={{ width: "0.62em", height: "0.62em", color: "#6b6b6b" }}
              />
              <span>{numberWithCommas(item?.likeCount)}</span>
            </div>
          </div>
        )}
      </div>
      {item?.isSoldOut && (
        <div
          className={styles.sold_out_wrapper}
          style={{
            ...style,
            paddingTop: cardHeight - 28 || 0,
          }}
        >
          <span className={styles.sold_out_badge}>품절</span>
        </div>
      )}
    </div>
  );
};
