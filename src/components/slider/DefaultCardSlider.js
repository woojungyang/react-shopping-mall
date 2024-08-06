import React, { useEffect, useMemo, useRef, useState } from "react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { ItemCard } from "components/card";

import styles from "styles/_main.module.scss";

import { CustomSliderContainer } from "./CustomSliderContainer";

const DefaultBanner = () => {
  return null;
};

export const DefaultCardSlider = ({ items = [], banner, perSlide = 5 }) => {
  const sliderRef = useRef(null);

  const bannerRef = useRef(null);
  const RenderComponent = banner ?? DefaultBanner;
  const [bannerWidth, setBannerWidth] = useState(0);

  useEffect(() => {
    if (bannerRef.current && bannerRef.current.offsetWidth)
      setBannerWidth(bannerRef.current.offsetWidth + 20);
    else setBannerWidth(0);
  }, [bannerRef.current, bannerRef?.current?.offsetWidth]);

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
          <CustomSliderContainer
            ref={sliderRef}
            settings={{
              infinite: true,
              speed: 500,
              slidesToShow: !!bannerWidth ? 3 : perSlide,
              slidesToScroll: 1,
            }}
          >
            {items.map((item, index) => {
              return (
                <div key={index}>
                  <ItemCard
                    item={item}
                    style={{
                      height: "400px",
                    }}
                  />
                </div>
              );
            })}
          </CustomSliderContainer>
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
