import React, { forwardRef } from "react";



import Slider from "react-slick";



import "styles/basic-react-slick.css";


export const CustomSliderContainer = forwardRef(
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