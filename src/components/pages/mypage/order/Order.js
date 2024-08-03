import React from "react";

import { getOrderState } from "models/order";
import { numberWithCommas } from "utilities";

import styles from "styles/_mypage.module.scss";

export default function Order({ product = {} }) {
  return (
    <div className={styles.order_payment_wrapper}>
      <p className={styles.order_payment_state}>
        {getOrderState(product.state)}
      </p>
      <div className={styles.order_payment_item_wrap}>
        <img
          src={require(`assets/images/sub/sub12.jpg`)}
          className={styles.avatar}
        />
        <div className={styles.order_payment_item_info}>
          <p className={styles.order_payment_product_name}>
            {product.itemName}
          </p>
          <div>
            <p className={styles.order_payment_option}>
              {product.option}| {product.quantity}개
            </p>
            <p className={styles.order_payment_price}>
              {numberWithCommas(product.price)}원
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
