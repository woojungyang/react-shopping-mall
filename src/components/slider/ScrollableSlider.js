import React, { useCallback, useRef } from "react";

import styles from "styles/_common.module.scss";

import { SliderPagination } from "./SliderPagination";

export const ScrollableSlider = ({
  showScroll = true,
  children,
  scrollBgColor = "",
  scrollPercentColor = "",
}) => {
  const listRef = useRef(null);
  const scrollbarRef = useRef(null);

  return (
    <div className={styles.scrollable_container}>
      <div
        className={styles.scrollable_list}
        ref={listRef}
        // onScroll={handleTopListScroll}
      >
        {children}
      </div>
    </div>
  );
};
{
  /* {showScroll && (
        <div
          className={styles.mb_slider_wrapper}
          style={{ backgroundColor: scrollBgColor }}
          onScroll={handleBottomBarScroll}
          ref={scrollbarRef}
        >
          <div
            className={styles.mb_slider_percent}
            style={{
              backgroundColor: scrollPercentColor,
            }}
          ></div>
        </div>
      )} */
}

/* const handleBottomBarScroll = useCallback(() => {
  if (listRef.current && scrollbarRef.current) {
    const scrollPercentage =
      scrollbarRef.current.scrollLeft /
      (scrollbarRef.current.scrollWidth - scrollbarRef.current.clientWidth);
    listRef.current.scrollLeft =
      scrollPercentage *
      (listRef.current.scrollWidth - listRef.current.clientWidth);
  }
}, []);

const handleTopListScroll = useCallback(() => {
  if (listRef.current && scrollbarRef.current) {
    const scrollPercentage =
      listRef.current.scrollLeft /
      (listRef.current.scrollWidth - listRef.current.clientWidth);
    scrollbarRef.current.scrollLeft =
      scrollPercentage *
      (scrollbarRef.current.scrollWidth - scrollbarRef.current.clientWidth);
  }
}, []); */
