import React, { forwardRef, useMemo } from "react";

import Slider from "react-slick";

import "styles/basic-react-slick.css";

export const CustomSliderContainer = forwardRef(
  (
    {
      children,
      setCurrentIndex,
      arrows = false,
      settings = {},
      autoPlay = false,
    },
    ref,
  ) => {
    const memoizedSettings = useMemo(
      () => ({
        ...settings,
        arrows: arrows,
        autoplay: autoPlay,
        afterChange: (newIndex) => {
          setCurrentIndex?.(newIndex);
        },
      }),
      [settings, arrows, autoPlay, setCurrentIndex],
    );
    return (
      <div className="one-row-slider">
        <Slider ref={ref} {...memoizedSettings}>
          {children}
        </Slider>
      </div>
    );
  },
);
