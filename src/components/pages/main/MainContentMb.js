import React, { useRef, useState } from "react";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import Slider from "react-slick";

import { ItemFullCard } from "components/card";
import { ItemCard } from "components/card/ItemCard";
import {
  BasicSlider,
  ImageSlider,
  ScrollableSlider,
  SliderPagination,
} from "components/slider";

import { calculatePercent } from "utilities/calculatePercent";

import styles from "styles/_main.module.scss";

export default function MainContentMb() {
  const [currentMainSliderIndex, setCurrentMainSliderIndex] = useState(0);
  const totalImages = 8;

  const categoryMenu = [
    { id: 1, name: "OUTERS" },
    { id: 2, name: "TOPS" },
    { id: 3, name: "BOTTOMS" },
    { id: 4, name: "ACCS" },
    { id: 5, name: "SHOES" },
    { id: 6, name: "BEAUTY" },
  ];

  const [eventItems, setEventItems] = useState([...new Array(10)]);
  const [currentEventSliderIndex, setCurrentEventSliderIndex] = useState(0);

  const [bestItems, setBestItems] = useState([...new Array(8)]);
  const [currentBestSliderIndex, setCurrentBestSliderIndex] = useState(0);

  return (
    <div className={styles.main_container_mb}>
      <div className="slider-container" style={{ position: "relative" }}>
        <ImageSlider
          images={[...new Array(totalImages)]}
          currentIndex={currentMainSliderIndex}
          setCurrentIndex={setCurrentMainSliderIndex}
        />

        <SliderPagination
          bgColor="black"
          percentColor="#f2d16d"
          customStyle={{
            height: 5,
            marginTop: -5,
            width: `100%`,
          }}
          percent={calculatePercent(currentMainSliderIndex, totalImages)}
        />
      </div>

      <div className={styles.category_wrapper_mb}>
        <ScrollableSlider showScroll={false}>
          {categoryMenu.map((menu) => (
            <div className={styles.category_wrap_mb}>
              <img
                src={require("assets/images/sub/sub24.jpg")}
                alt=""
                className={styles.category_icon}
              />
              <p className={styles.category_name}>{menu.name}</p>
            </div>
          ))}
        </ScrollableSlider>
      </div>

      <div className={styles.event_wrapper_mb}>
        <div className={styles.event_header}>
          <p className={styles.event_title}>더운 여름, 시원하게 챙기기</p>
          <p className={styles.event_more}>자세히 보기 ></p>
        </div>
        <ScrollableSlider scrollBgColor="white" scrollPercentColor="black">
          {eventItems.map((item, index) => (
            <ItemFullCard
              key={index}
              product={item}
              style={{
                height: 400,
                flex: "0 0 calc(33.333% - 10px)",
                minWidth: 230,
              }}
            />
          ))}
        </ScrollableSlider>

        <button className={styles.default_button_dark_300}>
          <p>다른 기획전 보기 1/1</p>
          <RotateLeftIcon />
        </button>
      </div>
      <div className={styles.best_item_wrapper}>
        <h3>Best Item</h3>
        <ScrollableSlider>
          {bestItems.map((item, index) => (
            <ItemFullCard
              showStatus={true}
              key={index}
              product={item}
              style={{
                height: 300,
                flex: "0 0 calc(33.333% - 10px)",
                minWidth: 200,
              }}
            />
          ))}
        </ScrollableSlider>

        <button className={styles.default_button_background_100_outline}>
          <p>상품 더보기</p>
          <KeyboardArrowRightIcon />
        </button>
      </div>
      <div className={styles.event_wrapper_mb2}>
        <h3>BRAND NEWS</h3>

        <p className={styles.title}>안타티카 단독 시즌 클리어런스</p>
        <p className={styles.sub_title}>오직 우티크에서만, UP TO 70% OFF</p>

        <img
          src={require("assets/images/sub/sub24.jpg")}
          alt=""
          className={styles.event_banner_mb}
        />
        <ScrollableSlider scrollBgColor="red" scrollPercentColor="white">
          {bestItems.map((item, index) => (
            <ItemFullCard
              showStatus={false}
              showBrand={false}
              showOriginalPrice={false}
              key={index}
              product={item}
              style={{
                height: 250,
                flex: "0 0 calc(33.333% - 10px)",
                minWidth: 150,
              }}
            />
          ))}
        </ScrollableSlider>
      </div>

      <div className={styles.best_item_wrapper}>
        <h3>STYLE PICK +</h3>
        <ScrollableSlider>
          {bestItems.map((item, index) => (
            <img
              src={require("assets/images/sub/sub24.jpg")}
              alt=""
              style={{
                height: 150,
                flex: "0 0 calc(20% - 10px)",
                minWidth: 120,
              }}
              className={styles.style_card}
            />
          ))}
        </ScrollableSlider>

        <button className={styles.default_button_background_100_outline}>
          <p>스타일 더보기</p>
          <KeyboardArrowRightIcon />
        </button>
      </div>
      <div className={styles.best_item_wrapper}>
        <h3>For You</h3>
        <div className={styles.for_you_wrapper}>
          <Slider
            arrows={false}
            {...{
              className: "slider variable-width",
              variableWidth: true,
              infinite: false,
              speed: 500,
              rows: 2,
              slidesPerRow: 2,
            }}
          >
            {bestItems.map((item, index) => (
              <img
                src={require("assets/images/sub/sub24.jpg")}
                alt=""
                className={styles.recommend_card}
                style={{ width: 20 }}
              />
            ))}
          </Slider>
        </div>

        <button className={styles.default_button_background_100_outline}>
          <p>상품 더보기</p>
          <KeyboardArrowRightIcon />
        </button>
      </div>
    </div>
  );
}
