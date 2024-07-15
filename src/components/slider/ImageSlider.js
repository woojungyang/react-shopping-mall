import React, { useRef } from "react";

import classNames from "classnames";
import { Device } from "models/device";
import Slider from "react-slick";

import { useUserDevice } from "hooks/size/useUserDevice";

import styles from "styles/_main.module.scss";

export const ImageSlider = ({ images, currentIndex = 0, setCurrentIndex }) => {
  const slider = useRef(null);
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;
  const settings = {
    dots: false,
    className: "center",
    centerMode: isDeskTop,
    infinite: true,
    centerPadding: "200px",
    slidesToShow: 1,
    speed: 1000,
    responsive: [
      {
        breakpoint: 760,
        settings: {
          centerPadding: "0px",
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider
      ref={slider}
      {...settings}
      autoplay
      arrows={false}
      afterChange={(newIndex) => {
        setCurrentIndex?.(newIndex);
      }}
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={require(`assets/images/main/main${index + 1}.jpg`)}
          // className={classNames({
          //   [styles.main_image]: true,
          //   [styles.main_image_disabled]: currentIndex != index && isDeskTop,
          // })}
        />
      ))}
    </Slider>
  );
};
