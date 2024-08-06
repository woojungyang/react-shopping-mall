import React, { useMemo, useRef } from "react";

import GradingIcon from "@mui/icons-material/Grading";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "utilities";

import styles from "styles/_common.module.scss";

import { LikeHeart } from "./LikeHeart";

export const ItemCard = ({
  showBrand = true,
  showStatus = false,
  showOriginalPrice = true,
  item,
  style = {
    // height: product ? 480 : 400,
    // maxWidth: product ? 330 : 250,
  },
}) => {
  const navigation = useNavigate();
  const contentRef = useRef(null);

  const imageHeight = useMemo(() => {
    if (contentRef.current)
      return style.height - contentRef.current.clientHeight;
  }, [contentRef.current]);

  return (
    <div
      className={styles.default_item_card_container}
      style={style}
      onClick={() => navigation(`/items/${item}`)}
    >
      <LikeHeart />
      <img
        src={require(`assets/images/sub/sub${1}.jpg`)}
        className={styles.item_image}
        style={{ height: imageHeight }}
      />
      <div className={styles.item_card_information} ref={contentRef}>
        {showBrand && <p className={styles.item_brand_name}>BrandName</p>}
        <p
          className={styles.item_product_name}
          style={{ marginTop: showBrand ? "10px" : "0.5em" }}
        >
          ProductName{item}
        </p>
        <div className={styles.default_flex_space} style={{ marginTop: 20 }}>
          <p className={styles.product_price}>
            {numberWithCommas(10000)}
            {showOriginalPrice && <span> {numberWithCommas(90000)}</span>}
          </p>
          <p className={styles.discount_rate}>
            <span>20</span>%
          </p>
        </div>
        {showStatus && (
          <div className={styles.more_item_information}>
            <div className={styles.default_flex}>
              <LikeHeart
                position={{ position: "relative" }}
                defaultColor="skeleton"
              />
              <span style={{ marginRight: 10 }}>{numberWithCommas(1234)}</span>
              <GradingIcon
                style={{ width: "0.65em", height: "0.65em", color: "#6b6b6b" }}
              />
              <span>{numberWithCommas(1234)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
