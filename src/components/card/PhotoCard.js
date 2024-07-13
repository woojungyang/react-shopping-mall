import React from "react";

import styles from "styles/_common.module.scss";

export const PhotoCard = ({ contents }) => {
  return (
    <div className={styles.default_card_container}>
      <img src={require("assets/images/sub/sub11.jpg")} />
      <p className={styles.card_title}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <p className={styles.card_content}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque ullam
        odio excepturi sequi sint ut accusamus quaerat aut, repellendus
        voluptates? Corporis natus minima quibusdam consequatur necessitatibus
        quam exercitationem, fuga quia.
      </p>
    </div>
  );
};
