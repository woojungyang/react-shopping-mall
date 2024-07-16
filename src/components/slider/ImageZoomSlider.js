import React, { useCallback, useMemo, useRef, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import classNames from "classnames";
import Slider from "react-slick";

import styles from "styles/_detail.module.scss";

const limit = 5;

export const ImageZoomSlider = ({ images = [] }) => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const previous = useCallback(() => containerRef.current.slickPrev(), []);
  const next = useCallback(() => containerRef.current.slickNext(), []);

  const currentPage = useMemo(
    () => Math.floor(currentIndex / limit),
    [currentIndex, limit],
  );

  const pagerArray = useMemo(() => {
    const totalCount = images.length;
    const pageCount = Math.min(limit, totalCount - currentPage * limit);
    console.log(pageCount);
    return Array.from({ length: pageCount }, (_, i) => i + currentPage * limit);
  }, [currentPage, images.length, limit]);

  function changeSlider(index) {
    setCurrentIndex(index);
    containerRef.current.slickGoTo(index);
  }

  return (
    <div className={styles.image_zoom_container}>
      <Slider
        {...settings}
        ref={containerRef}
        afterChange={(newIndex) => {
          setCurrentIndex?.(newIndex);
        }}
      >
        {images.map((image, index) => (
          <div key={index} className={styles.slide}>
            <img
              src={require(`assets/images/main/main${index + 1}.jpg`)}
              alt={`slide ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
      <div className={styles.slider_button}>
        <ArrowBackIcon onClick={previous} />
        <ArrowForwardIcon onClick={next} />
      </div>
      <div className={styles.slider_pagination_wrapper}>
        {pagerArray.map((e, index) => (
          <SquarePager
            currentIndex={currentIndex}
            changeSlider={changeSlider}
            page={e}
          />
        ))}
      </div>
    </div>
  );
};

function SquarePager({ page, currentIndex, changeSlider }) {
  return (
    <div
      onClick={() => changeSlider(page)}
      className={classNames({
        [styles.square_pager]: true,
        [styles.square_pager_active]:
          page == currentIndex ||
          (currentIndex > 4 && currentIndex - limit == page),
      })}
    ></div>
  );
}
