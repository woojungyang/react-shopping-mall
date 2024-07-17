import React, { useCallback, useMemo, useRef, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import classNames from "classnames";
import Slider from "react-slick";

import styles from "styles/_detail.module.scss";

const limit = 5;
const magnifierHeight = 100;
const magnifierWidth = 100;
const zoomLevel = 3;

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

    return Array.from({ length: pageCount }, (_, i) => i + currentPage * limit);
  }, [currentPage, images.length, limit]);

  function changeSlider(index) {
    setCurrentIndex(index);
    containerRef.current.slickGoTo(index);
  }

  const originalImageRef = useRef(null);
  const scannerImageRef = useRef(null);

  const [showMagnifier, setShowMagnifier] = useState(false);
  const [axisXY, setAxisXY] = useState([0, 0]);
  const [imageSize, setImageSize] = useState([]);

  console.log(imageSize);

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
              onMouseEnter={(e) => {
                const element = e.currentTarget;
                const { width, height } = element.getBoundingClientRect();
                setImageSize([width, height]);

                setShowMagnifier(true);
              }}
              onMouseMove={(e) => {
                const element = e.currentTarget;

                const { top, left } = element.getBoundingClientRect();

                const x = e.clientX - left;
                const y = e.clientY - top;

                setAxisXY([x, y]);
              }}
              onMouseLeave={() => setShowMagnifier(false)}
            />
            {showMagnifier && (
              <div
                className={styles.scanner}
                style={{
                  display: showMagnifier ? "" : "none",
                  width: magnifierWidth,
                  height: magnifierHeight,
                  top: `${axisXY[1] - magnifierHeight / 2}px`,
                  left: `${axisXY[0] - magnifierWidth / 2}px`,
                  opacity: "1", // reduce opacity so you can verify position

                  backgroundColor: "white",
                  backgroundImage: `url('assets/images/main/main${index + 1}.jpg')`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: `${imageSize[0] * zoomLevel}px ${
                    imageSize[1] * zoomLevel
                  }px`,
                  backgroundPositionX: `${-axisXY[0] * zoomLevel + magnifierWidth / 2}px`,
                  backgroundPositionY: `${-axisXY[1] * zoomLevel + magnifierHeight / 2}px`,
                }}
              ></div>
            )}
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
