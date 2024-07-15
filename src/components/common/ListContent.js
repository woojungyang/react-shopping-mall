import React from "react";

import styles from "styles/_common.module.scss";

export const ListContent = ({ icon, content }) => {
  return (
    <div className={styles.list_content_wrapper}>
      <span>{icon ?? "•"}</span>
      <p style={{ width: "100%" }}>{content}</p>
    </div>
  );
};
