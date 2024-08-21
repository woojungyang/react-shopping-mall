import React from "react";

import { getOrderState } from "models/order";
import { numberWithCommas } from "utilities";

import styles from "styles/_mypage.module.scss";

export default function Order({ item = {} }) {
  return (
    <div className={styles.order_payment_wrapper}>
      <p className={styles.order_payment_state}>{getOrderState(item.state)}</p>
      <div className={styles.order_payment_item_wrap}>
        <img src={item?.thumbnail} className={styles.avatar} />
        <div className={styles.order_payment_item_info}>
          <p className={styles.order_payment_product_name}>{item.itemName}</p>
          <div>
            <p className={styles.order_payment_option}>
              {item.option}| {item.quantity}개
            </p>
            <p className={styles.order_payment_price}>
              {numberWithCommas(item.price)}원
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
