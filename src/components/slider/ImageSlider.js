import React, { useRef, useState } from "react";

import classNames from "classnames";
import { Device } from "models/device";
import Slider from "react-slick";

import { useUserDevice } from "hooks/size/useUserDevice";

import styles from "styles/_main.module.scss";

export const ImageSlider = ({
  images = [],
  currentIndex = 0,
  setCurrentIndex,
  autoplay = true,
}) => {
  const slider = useRef(null);
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;
  const settings = {
    dots: false,
    className: "center",
    centerMode: true,
    infinite: true,
    speed: 1500,
    centerPadding: "60px",
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [animationActiveSlide, setAnimationActiveSlide] = useState(0);

  return (
    <div style={{ position: "relative" }}>
      <Slider
        ref={slider}
        {...settings}
        autoplay={autoplay}
        arrows={false}
        afterChange={(newIndex) => {
          setCurrentIndex?.(newIndex);
          setAnimationActiveSlide(newIndex);
        }}
      >
        {images.map((image, index) => {
          if (isDeskTop) {
            return (
              <div key={index} className={styles.desktop_slider_image_wrapper}>
                <img src={image?.url} className={styles.slider_image} />
                <div
                  className={classNames({
                    [styles.slider_copyright]: animationActiveSlide == index,
                    [styles.slider_copyright_active]: true,
                  })}
                >
                  <div style={{ maxWidth: 500 }}>
                    <h1>{image?.title}</h1>
                    <p>{image?.subTitle}</p>
                  </div>
                </div>
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
      {/*  {isDeskTop && (
        <div className={styles.desktop_slider_button_wrap}>
          <ArrowBackIosNewIcon onClick={() => slider.current.slickPrev()} />
          <ArrowForwardIosIcon onClick={() => slider.current.slickNext()} />
        </div>
      )} */}
    </div>
  );
};
{
  /* */
}
