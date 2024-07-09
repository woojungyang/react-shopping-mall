import React, { useRef, useState } from "react";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

import { ItemCard } from "components/card";
import { BasicSlider, ImageSlider, SliderPagination } from "components/slider";

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
      <div className={styles.category_wrapper}>
        <BasicSlider>
          {categoryMenu.map((menu) => (
            <div className={styles.category_wrap}>
              <img src={require("assets/images/sub/sub24.jpg")} alt="" />
              <p className={styles.category_name}>{menu.name}</p>
            </div>
          ))}
        </BasicSlider>
      </div>
      <div className={styles.event_wrapper}>
        <div className={styles.event_header}>
          <p className={styles.event_title}>더운 여름, 시원하게 챙기기</p>
          <p className={styles.event_more}>자세히 보기 ></p>
        </div>
        <div className={styles.event_wrap}>
          <BasicSlider setCurrentIndex={setCurrentEventSliderIndex}>
            {eventItems.map((item, index) => (
              <div className={styles.event_card}>
                <ItemCard
                  key={index}
                  product={item}
                  style={{
                    height: 400,
                    maxWidth: 230,
                  }}
                />
              </div>
            ))}
          </BasicSlider>
        </div>
        <SliderPagination
          bgColor="white"
          percentColor="black"
          percent={calculatePercent(currentEventSliderIndex, eventItems.length)}
        />
        <button className={styles.default_button_dark_300}>
          <p>다른 기획전 보기 1/1</p>
          <RotateLeftIcon />
        </button>
      </div>
      <div className={styles.best_item_wrapper}>
        <h3>Best Item</h3>
        <BasicSlider setCurrentIndex={setCurrentBestSliderIndex}>
          {bestItems.map((item, index) => (
            <div className={styles.best_card}>
              <p className={styles.ranking}>{index + 1}</p>
              <ItemCard
                key={index}
                product={item}
                style={{
                  height: 300,
                  maxWidth: 200,
                }}
              />
            </div>
          ))}
        </BasicSlider>
        <SliderPagination
          bgColor="gray"
          percentColor="black"
          percent={calculatePercent(currentBestSliderIndex, bestItems.length)}
        />
        <button className={styles.default_button_background_100_outline}>
          <p>상품 더보기</p>
          <KeyboardArrowRightIcon />
        </button>
      </div>
      <div className={styles.event_wrapper2}>
        <h3>BRAND NEWS</h3>

        <p className={styles.title}>안타티카 단독 시즌 클리어런스</p>
        <p className={styles.sub_title}>오직 우티크에서만, UP TO 70% OFF</p>

        <img src={require("assets/images/sub/sub24.jpg")} alt="" />
      </div>

      {/*
       */}
    </div>
  );
}
