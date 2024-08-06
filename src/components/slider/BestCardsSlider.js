import React, { useEffect, useMemo, useRef, useState } from "react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { ItemCard } from "components/card";

import styles from "styles/_main.module.scss";

import { BasicSlider } from "./BasicSlider";

const DefaultBanner = () => {
  return null;
};

export const BestCardsSlider = ({ items = [], banner }) => {
  const sliderRef = useRef(null);

  const bannerRef = useRef(null);

  const [bannerWidth, setBannerWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (bannerRef.current && bannerRef.current.offsetWidth)
      setBannerWidth(bannerRef.current.offsetWidth + 20);
    else setBannerWidth(0);
  }, [bannerRef.current]);

  const RenderComponent = banner ?? DefaultBanner;

  return (
    <div className={styles.best_product_container}>
      <div ref={bannerRef}>
        <RenderComponent r />
      </div>
      <div className={styles.default_item_slider_container}>
        <ArrowBackIosIcon
          className={styles.slider_arrow}
          style={{ left: "-3%" }}
          onClick={() => sliderRef.current.slickPrev()}
        />
        <div
          className={styles.default_item_slider_wrapper}
          style={{
            width: bannerWidth > 0 ? `calc(100% - ${bannerWidth}px)` : "100%",
            marginLeft: bannerWidth > 0 ? 20 : 0,
          }}
        >
          <BasicSlider
            ref={sliderRef}
            setCurrentIndex={setCurrentIndex}
            settings={{
              infinite: true,
              speed: 500,
              slidesToShow: !!bannerWidth ? 3 : 5,
              slidesToScroll: 1,
            }}
          >
            {items.map((item, index) => {
              const firstSlide = currentIndex == index;
              return (
                <div key={index}>
                  <ItemCard
                    item={item}
                    style={{
                      height: "400px",
                      paddingLeft: 20,
                      marginLeft: "-20px",
                      // marginRight:
                      //   index & (5 == 3)
                      //     ? "10px"
                      //     : index & (5 == 4)
                      //       ? "20px"
                      //         ? "0px"
                      //         : 0
                      //       : 0,
                      // marginLeft: firstSlide ? 2 : "-10.3px",
                      // width: firstSlide ? "calc(90% - 12px)" : "90%",
                    }}
                  />
                </div>
              );
            })}
          </BasicSlider>
        </div>

        <ArrowForwardIosIcon
          className={styles.slider_arrow}
          style={{ right: "-3.70%" }}
          onClick={() => sliderRef.current.slickNext()}
        />
      </div>
    </div>
  );
};
