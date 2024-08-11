import React, { forwardRef, useCallback, useState } from "react";

import Slider from "react-slick";
import { router } from "routes";

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
    return (
      <div className="one-row-slider">
        <Slider
          ref={ref}
          autoplay={autoPlay}
          {...settings}
          arrows={arrows}
          afterChange={(newIndex) => {
            setCurrentIndex?.(newIndex);
          }}
        >
          {children}
        </Slider>
      </div>
    );
  },
);
