import React from "react";

import classNames from "classnames";

import { SmallCard } from "components/card";

import styles from "styles/_category.module.scss";

export default function PopUpCard({ event, style = {}, className = "" }) {
  return (
    <div
      className={classNames({ [styles.exhibition]: true, [className]: true })}
      style={style}
    >
      <hr />
      <img
        className={styles.exhibition_thumbnail}
        src={event?.thumbnail}
        alt=""
      />
      <p className={styles.title}>
        [{event?.keyword}]
        <br />
        {event?.title}
      </p>
      <p className={styles.subtitle}>{event?.subTitle}</p>
      <div className={styles.exhibition_item_wrap}>
        {event?.items?.map((item) => (
          <div className={styles.exhibition_item}>
            <SmallCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
