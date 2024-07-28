import React from "react";

import styles from "styles/_detail.module.scss";

export default function EmptyList({ comment = "" }) {
  return (
    <div className={styles.empty_list_wrapper}>
      <div className={styles.empty_review_wrap}>
        <p>{comment}</p>
      </div>
    </div>
  );
}
