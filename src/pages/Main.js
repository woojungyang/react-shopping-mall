import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import { CommonLayout } from 'components/common';
import styles from 'styles/_main.module.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function Main() {
  const slider = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = 8;
  const progressBarWidth = useRef(null);
  let percentage = (currentIndex / (totalImages - 1)) * 100;

  function addLeadingZero(number) {
    return number.toString().padStart(2, '0');
  }

  return (
    <CommonLayout>
      <div className={styles.main_image_container}>
        <div className="slider-container" style={{ position: 'relative' }}>
          <Slider
            ref={slider}
            {...settings}
            autoplay
            arrows={false}
            afterChange={newIndex => {
              setCurrentIndex(newIndex);
            }}
          >
            {[...new Array(totalImages)].map((e, i) => (
              <img
                key={i}
                src={require(`assets/images/main/main${i + 1}.jpg`)}
                className={styles.main_image}
              />
            ))}
          </Slider>
        </div>
        <div className={styles.main_slider_wrapper}>
          <p className={styles.slider_index}>{addLeadingZero(currentIndex + 1)}</p>
          <div style={{ position: 'relative' }}>
            <div className={styles.main_slider_bottom}></div>
            <div
              className={styles.main_slider_percent}
              ref={progressBarWidth}
              style={{
                width: percentage + '%',
              }}
            ></div>
          </div>
          <p className={styles.slider_index}>{addLeadingZero(totalImages)}</p>
          <div className={styles.main_slider_button}>
            <ArrowBackIosNewIcon onClick={() => slider?.current?.slickPrev()} />
          </div>
          <div className={styles.main_slider_button}>
            <ArrowForwardIosIcon onClick={() => slider?.current?.slickNext()} />
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
