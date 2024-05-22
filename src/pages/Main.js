import React, { Fragment, useRef, useState } from 'react';
import Slider from 'react-slick';
import { CommonLayout, DominoPagination } from 'components/common';
import styles from 'styles/_main.module.scss';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from 'react-router-dom';
import { BestCardsSlider } from 'components/slider';

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

  const dummyMenu = [
    { id: 1, name: 'BEST' },
    { id: 2, name: 'NEW' },
    { id: 3, name: 'ZOOM' },
    { id: 4, name: 'SALE' },
  ];

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
        <div className={styles.items_contents_container}>
          <div className={styles.items_contents_wrapper}>
            <div className={styles.item_category_wrapper}>
              {dummyMenu.map((e, i) => (
                <div className={styles.item_category}>
                  <Link to={'#'}>{e.name} </Link>
                  <span>{i + 1 != dummyMenu?.length && '|'}</span>
                </div>
              ))}
            </div>
            <div className={styles.second_slider_container}>
              <div className={styles.slider_subtitle_wrapper}>
                <h4 className={styles.slider_subtitle}>WHAT'S BEST</h4>
                {/* <div className={styles.default_flex}>
                  <DominoPagination />
                  <p className={styles.view_all_button}>View All</p>
                </div> */}
              </div>
              <BestCardsSlider />
            </div>
            <div className={styles.collection_container}>
              <div className={styles.collection_img_wrapper}>
                <img src={require('assets/images/main/main24.jpg')} />
                <img src={require('assets/images/sub/sub23.jpg')} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
}
