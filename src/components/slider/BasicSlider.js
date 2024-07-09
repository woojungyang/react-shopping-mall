import React from "react";

import Slider from "react-slick";

export const BasicSlider = ({
  children,
  setCurrentIndex,
  arrows = false,
  settings = {
    className: "center",
    infinite: false,
    centerPadding: "60px",
    slidesToShow: 1,
    variableWidth: true,
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`,
      );
    },
  },
}) => {
  return (
    <div className="slider-container">
      <Slider
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
};
