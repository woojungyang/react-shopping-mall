import React, { useRef, useState } from "react";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

import { ItemCard, SmallCard } from "components/card";
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
  const [bestItems, setBestItems] = useState([...new Array(8)]);

  const [collaborationItems, setCollaborationItems] = useState([
    ...new Array(2),
  ]);

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

      <div className={styles.best_item_wrapper}>
        <div className={styles.default_flex_space}>
          <h3>For You</h3>
          {/* <button className={styles.refresh_button}>
            <p>추천상품 새로고침</p>
            <RotateLeftIcon />
          </button> */}
        </div>
        <div className={styles.scrollable_container}>
          <BasicSlider
            arrows={false}
            settings={{
              rows: 2,
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: false,
            }}
          >
            {bestItems.map((product, index) => (
              <div className={styles.default_item_card_container} key={index}>
                <ItemCard
                  showStatus={false}
                  showBrand={false}
                  showOriginalPrice={false}
                  product={index}
                  style={{
                    height: 300,
                    minWidth: 100,
                  }}
                />
              </div>
            ))}
          </BasicSlider>
        </div>
        {/* </div> */}

        <button className={styles.button_background_100_outline_mb}>
          <p>추천상품 전체보기</p>
          <KeyboardArrowRightIcon />
        </button>
      </div>

      <div className={styles.event_wrapper_mb}>
        <div className={styles.event_header}>
          <p className={styles.event_title}>더운 여름, 시원하게 챙기기</p>
          <p className={styles.event_more}>자세히 보기 ></p>
        </div>
        <ScrollableSlider scrollBgColor="white" scrollPercentColor="black">
          {eventItems.map((item, index) => (
            <ItemCard
              key={index}
              product={item}
              style={{
                height: 400,
                flex: "0 0 calc(38% - 10px)",
                minWidth: 230,
              }}
            />
          ))}
        </ScrollableSlider>

        <button className={styles.button_dark_300_mb}>
          <p>다른 기획전 보기 1/1</p>
          <RotateLeftIcon />
        </button>
      </div>
      <div className={styles.best_item_wrapper}>
        <h3>Best Item</h3>
        <ScrollableSlider>
          {bestItems.map((item, index) => (
            <ItemCard
              showStatus={true}
              key={index}
              product={item}
              style={{
                height: 300,
                flex: "0 0 calc(31% - 10px)",
                minWidth: 200,
              }}
            />
          ))}
        </ScrollableSlider>

        <button className={styles.button_background_100_outline_mb}>
          <p>상품 더보기</p>
          <KeyboardArrowRightIcon />
        </button>
      </div>
      <div className={styles.brand_news_wrapper}>
        <div className={styles.band_thumbnail_wrapper}>
          <img src={require("assets/images/sub/sub24.jpg")} alt="" />
          <div className={styles.brand_copyright}>
            <h2>Lorem ipsum dolor</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore
              nostrum ducimus repudiandae perspiciatis nisi, nihil aspernatur
              corrupti maiores nobis earum, suscipit soluta rerum sit sapiente
              doloremque, repellendus vel. Fugit, molestias!
            </p>
          </div>
        </div>
        {collaborationItems.map((e) => (
          <div className={styles.brand_item_wrap}>
            <SmallCard />
          </div>
        ))}
      </div>
      <div className={styles.event_wrapper_mb2}>
        <h3>SHOPPING NEWS</h3>

        <p className={styles.title}>안타티카 단독 시즌 클리어런스</p>
        <p className={styles.sub_title}>오직 우티크에서만, UP TO 70% OFF</p>

        <img
          src={require("assets/images/sub/sub24.jpg")}
          alt=""
          className={styles.event_banner_mb}
        />
        <ScrollableSlider scrollBgColor="red" scrollPercentColor="white">
          {bestItems.map((item, index) => (
            <ItemCard
              showStatus={false}
              showBrand={false}
              showOriginalPrice={false}
              key={index}
              product={item}
              style={{
                height: 250,
                flex: "0 0 calc(28% - 10px)",
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
                flex: "0 0 calc(23% - 10px)",
                minWidth: 120,
              }}
              className={styles.style_card}
            />
          ))}
        </ScrollableSlider>

        <button className={styles.button_background_100_outline_mb}>
          <p>스타일 더보기</p>
          <KeyboardArrowRightIcon />
        </button>
      </div>
    </div>
  );
}
