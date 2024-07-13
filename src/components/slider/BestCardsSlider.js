import React, { useMemo, useState } from "react";

import { Device } from "models/device";
import { numberWithCommas } from "utilities";

import { useUserDevice } from "hooks/size/useUserDevice";

import { ItemCard } from "components/card";

import styles from "styles/_main.module.scss";

export const BestCardsSlider = () => {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  const cardSize = useMemo(
    () => [0, 0, 0, 0, 1, 1, 1].sort(() => Math.random() - 0.5),
    [isDeskTop],
  );

  return (
    <div className={styles.best_product_container}>
      {cardSize.map((product, index) => (
        <ItemCard
          key={index}
          product={product}
          style={{
            height: product ? 480 : 400,
            maxWidth: product ? 330 : 250,
          }}
        />
      ))}
    </div>
  );
};
