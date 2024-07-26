import React from "react";

import styles from "styles/_detail.module.scss";

export const DetailContentWrapper = ({
  children,
  title = "",
  border = false,
}) => {
  return (
    <div
      className={styles.detail_content_wrapper}
      style={{ borderBottom: border ? "1px solid #b6b5b5" : "" }}
    >
      {title && <p className={styles.detail_title}>{title}</p>}

      <div className={styles.detail_content_wrap}>{children}</div>
    </div>
  );
};
