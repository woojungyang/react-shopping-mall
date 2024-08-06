import React, { forwardRef } from "react";

import Slider from "react-slick";

export const BasicSlider = forwardRef(
  ({ children, setCurrentIndex, arrows = false, settings = {} }, ref) => {
    return (
      <div className="slider-container">
        <Slider
          ref={ref}
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
