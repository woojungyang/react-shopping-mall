import React, { useState } from "react";

import { numberWithCommas } from "utilities";

import { BestProductCard } from "components/card";
import { LikePin } from "components/common";

import styles from "styles/_main.module.scss";

export const BestCardsSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  const [cardSize, setCardSize] = useState(
    [0, 0, 0, 0, 1, 1, 1].sort(() => Math.random() - 0.5),
  );

  return (
    <div className={styles.best_product_container}>
      {cardSize.map((product, index) => (
        <div
          className={styles.best_product_wrapper}
          style={{
            height: product ? 480 : 400,
            maxWidth: product ? 330 : 250,
          }}
        >
          <img src={require(`assets/images/sub/sub${index + 1}.jpg`)} />
          <LikePin />
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
      ))}
    </div>
  );
};
