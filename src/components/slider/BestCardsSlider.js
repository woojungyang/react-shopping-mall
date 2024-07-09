import React, { useMemo, useState } from "react";

import { Device } from "models/device";
import { numberWithCommas } from "utilities";

import { useUserDevice } from "hooks/size/useUserDevice";

import { ItemCard, LikeHeart } from "components/card";

import styles from "styles/_main.module.scss";

export const BestCardsSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  const cardSize = useMemo(
    () =>
      isDeskTop
        ? [0, 0, 0, 0, 1, 1, 1].sort(() => Math.random() - 0.5)
        : [0, 0, 0, 0],
    [isDeskTop],
  );

  return (
    <div className={styles.best_product_container}>
      {cardSize.map((product, index) => (
        <ItemCard key={index} product={product} />
      ))}
    </div>
  );
};
