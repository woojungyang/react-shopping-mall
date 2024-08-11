import React, { useEffect, useRef, useState } from "react";

import { calculatePercent } from "utilities/calculatePercent";

import styles from "styles/_main.module.scss";

import { ChevronArrows } from "./ChevronArrows";
import { CustomSliderContainer } from "./CustomSliderContainer";
import { SliderPagination } from "./SliderPagination";

const DefaultBanner = () => {
  return null;
};

export const FlexBoxSlider = ({
  children,
  banner,
  settings = {},
  arrows = true,
  totalCount = 0,
}) => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const bannerRef = useRef(null);
  const RenderComponent = banner ?? DefaultBanner;
  const [bannerWidth, setBannerWidth] = useState(0);

  useEffect(() => {
    if (bannerRef.current && bannerRef.current.offsetWidth)
      setBannerWidth(bannerRef.current.offsetWidth + 20);
    else setBannerWidth(0);
  }, [bannerRef.current, bannerRef?.current?.offsetWidth]);

  return (
    <div className={styles.default_items_slider_container}>
      <div ref={bannerRef}>
        <RenderComponent r />
      </div>
      <div className={styles.default_item_slider_container}>
        <div
          className={styles.default_item_slider_wrapper}
          style={{
            height: "100%",
            position: "relative",
            width: bannerWidth > 0 ? `calc(100% - ${bannerWidth}px)` : "100%",
            marginLeft: bannerWidth > 0 ? 20 : 0,
          }}
        >
          <CustomSliderContainer
            ref={sliderRef}
            settings={settings}
            setCurrentIndex={setCurrentIndex}
          >
            {children}
          </CustomSliderContainer>
          {totalCount > 0 && (
            <div style={{ width: "100%", position: "absolute", bottom: "0%" }}>
              <SliderPagination
                bgColor="#dedede"
                percentColor="black"
                customStyle={{
                  height: 5,
                  marginTop: -5,
                  width: `100%`,
                }}
                percent={calculatePercent(
                  currentIndex + (settings.slidesToShow - 1),
                  totalCount,
                )}
              />
            </div>
          )}
        </div>
        {arrows && (
          <ChevronArrows
            style={{
              width: "110%",
              iconOptions: {
                width: 40,
                height: 60,
                color: "rgb(157, 157, 157)",
              },
            }}
            onClickPrev={() => {
              sliderRef.current.slickPrev();
            }}
            onClickNext={() => {
              sliderRef.current.slickNext();
            }}
          />
        )}
      </div>
    </div>
  );
};
