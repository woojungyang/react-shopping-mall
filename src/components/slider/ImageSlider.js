import React, { useRef } from "react";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import classNames from "classnames";
import { Device } from "models/device";
import Slider from "react-slick";

import { useUserDevice } from "hooks/size/useUserDevice";

import styles from "styles/_main.module.scss";

export const ImageSlider = ({
  images,
  currentIndex = 0,
  setCurrentIndex,
  autoplay = true,
}) => {
  const slider = useRef(null);
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div style={{ position: "relative" }}>
      <Slider
        ref={slider}
        {...settings}
        autoplay={autoplay}
        arrows={false}
        afterChange={(newIndex) => {
          setCurrentIndex?.(newIndex);
        }}
      >
        {images.map((image, index) => {
          if (isDeskTop) {
            return (
              <div key={index} className={styles.desktop_slider_image_wrapper}>
                <img
                  src={require(`assets/images/main/main${index + 1}.jpg`)}
                  className={styles.background_slider_image}
                />
                <img
                  src={require(`assets/images/main/main${index + 1}.jpg`)}
                  className={styles.silder_image}
                />
              </div>
            );
          } else {
            return (
              <img
                key={index}
                src={require(`assets/images/main/main${index + 1}.jpg`)}
                className={classNames({
                  [styles.main_image]: true,
                })}
              />
            );
          }
        })}
      </Slider>
      {isDeskTop && (
        <div className={styles.desktop_slider_button_wrap}>
          <ArrowBackIosNewIcon onClick={() => slider.current.slickPrev()} />
          <ArrowForwardIosIcon onClick={() => slider.current.slickNext()} />
        </div>
      )}
    </div>
  );
};
