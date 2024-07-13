import React from "react";

import styles from "styles/_detail.module.scss";

export default function ItemDetailContent() {
  return (
    <div className={styles.detail_container}>
      <div className={styles.item_information_wrapper}>
        <div className={styles.images_slider_wrapper}>슬라이더자리</div>
        <div className={styles.item_information_wrapper}>
          <h2>자가드 포켓 우븐 팬츠</h2>
          <p>Style Code: WXWP30644-BKS</p>
        </div>
      </div>
    </div>
  );
}
