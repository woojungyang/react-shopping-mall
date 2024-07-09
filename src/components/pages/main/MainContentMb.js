import React, { useRef, useState } from "react";

import { BasicSlider } from "components/slider";

import styles from "styles/_main.module.scss";

export default function MainContentMb() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = 8;
  const progressBarWidth = useRef(null);
  let percentage = (currentIndex / (totalImages - 1)) * 100;

  return (
    <div className={styles.main_container_mb}>
      <div className="slider-container" style={{ position: "relative" }}>
        <BasicSlider
          images={[...new Array(totalImages)]}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <div className={styles.mb_slider_wrapper}>
          <div
            className={styles.mb_slider_percent}
            style={{
              width: percentage + "%",
            }}
          ></div>
        </div>
      </div>
      
    </div>
  );
}
