import React, { useRef, useState } from "react";

import { ChevronRight } from "@mui/icons-material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { ItemCard, SmallCard } from "components/card";
import { DefaultButton } from "components/common";
import {
  CustomSliderContainer,
  ImageSlider,
  ScrollableSlider,
  SliderPagination,
} from "components/slider";

import { calculatePercent } from "utilities/calculatePercent";

import styles from "styles/_main.module.scss";

export default function MainContentMb({ data }) {
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

  const [moreFocus, setMoreFocus] = useState(1);
  if (!data) return null;

  return (
    <div className={styles.main_container_mb}>
      <div className="slider-container" style={{ position: "relative" }}>
        <ImageSlider
          images={data?.mainSlide}
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

      {/*   <div className={styles.category_wrapper_mb}>
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
      </div> */}

      {/* for u */}
      <div className={styles.best_item_wrapper}>
        <div className={styles.default_flex_space}>
          <h3>ITEMS FOR YOU</h3>
        </div>
        <div className={styles.scrollable_container}>
          <CustomSliderContainer
            arrows={false}
            settings={{
              rows: 2,
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: false,
            }}
          >
            {data?.recommendedItems.map((item, index) => (
              <div className={styles.default_item_card_container} key={index}>
                <ItemCard
                  showStatus={false}
                  showBrand={false}
                  showOriginalPrice={false}
                  item={item}
                  style={{
                    height: 300,
                    marginBottom: index % 1 == 0 ? "30px" : "",
                  }}
                />
              </div>
            ))}
          </CustomSliderContainer>
        </div>

        {/* <DefaultButton className={styles.button_background_100_outline}>
          <p>추천상품 전체보기</p>
          <KeyboardArrowRightIcon />
        </DefaultButton> */}
      </div>
      {/* event */}
      <div className={styles.event_wrapper_mb}>
        <div className={styles.event_header}>
          <div>
            <p className={styles.event_subtitle}>CLEARANCE</p>
            <p className={styles.event_title}>AD COPYRIGHT</p>
            <hr className={styles.event_title_line} />
          </div>
          <ChevronRight />
        </div>
        <div className={styles.event_items_body}>
          <ScrollableSlider scrollBgColor="white" scrollPercentColor="black">
            {data?.clearances?.items?.map((item, index) => (
              <ItemCard
                key={index}
                item={item}
                style={{
                  height: 230,
                  flex: "0 0 calc(33.3333% - 10px)",
                  minWidth: 150,
                  marginLeft: index == 0 ? 48 : 0,
                }}
              />
            ))}
          </ScrollableSlider>
        </div>

        {/*  <DefaultButton className={styles.button_dark_300}>
          <p>다른 기획전 보기 1/1</p>
          <RotateLeftIcon />
        </DefaultButton> */}
      </div>
      <div className={styles.best_item_wrapper}>
        <h3>MARK IT</h3>
        <ScrollableSlider>
          {data?.bestItems?.map((item, index) => (
            <ItemCard
              showStatus={true}
              key={index}
              item={item}
              style={{
                height: 300,
                flex: "0 0 calc(31% - 10px)",
                minWidth: 200,
              }}
            />
          ))}
        </ScrollableSlider>

        <DefaultButton className={styles.button_background_100_outline}>
          <p>상품 더보기</p>
          <KeyboardArrowRightIcon />
        </DefaultButton>
      </div>
      {/* brand news */}
      <div className={styles.brand_news_container}>
        <h3 className={styles.section_title}>BRAND NEWS</h3>
        <CustomSliderContainer
          settings={{
            infinite: true,
            speed: 500,
            centerMode: true,
            centerPadding: "15px",
            slidesToShow: 1,
            slidesToScroll: 1,
          }}
        >
          {data?.brands.map((brand) => (
            <div className={styles.brand_news_wrapper}>
              <img
                src={brand?.brandThumbnail}
                className={styles.brand_news_thumbnail}
              />
              <div className={styles.brand_info_wrap}>
                <h3 className={styles.brand_name}>{brand?.brandName}</h3>
                <p>{brand?.copyright}</p>
              </div>

              <div className={styles.brands_items_wrapper}>
                {brand?.items.map((item, index) => (
                  <SmallCard item={item} showBrand={false} />
                ))}
              </div>
            </div>
          ))}
        </CustomSliderContainer>
        {/* <BrandNewsContainer brand={data?.brands[0]} />
        <BrandNewsContainer brand={data?.brands[1]} /> */}

        {/* <BrandNewsContainer brand={data?.brands[2]} />
        <BrandNewsContainer brand={data?.brands[3]} /> */}
      </div>
      {/* focus */}
      <div className={styles.deep_in_focus_container}>
        <h3 className={styles.section_title}>DEPP IN FOCUS</h3>
        {data?.brandEvents?.slice(0, moreFocus)?.map((brandEvent, index) => (
          <div key={index} className={styles.deep_in_focus_wrapper}>
            <div className={styles.deep_in_focus_thumbnail_wrap}>
              <img
                src={brandEvent?.brandThumbnail}
                className={styles.item_thumbnail}
              />
              <div className={styles.brand_copyright_wrap}>
                <h2>{brandEvent?.brandName}</h2>
                <p>{brandEvent?.copyright}</p>
              </div>
            </div>

            <div className={styles.deep_in_focus_items_wrap}>
              {brandEvent?.items.map((item, index) => (
                <SmallCard key={index} item={item} />
              ))}
            </div>
          </div>
        ))}
        {moreFocus < data?.brandEvents.length && (
          <DefaultButton
            onClick={() => setMoreFocus(moreFocus + 1)}
            label="VIEW MORE +"
          />
        )}
      </div>

      {/* <div className={styles.brand_news_wrapper}>
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
      </div> */}
      {/* <div className={styles.event_wrapper_mb2}>
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
      </div> */}

      {/* <div className={styles.best_item_wrapper}>
        <h3>STYLE PICK +</h3>
        <ScrollableSlider>
          {data?.userStyles.map((userStyle, index) => (
            <img
              key={index}
              src={userStyle?.avatar}
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

        <DefaultButton className={styles.button_background_100_outline}>
          <p>스타일 더보기</p>
          <KeyboardArrowRightIcon />
        </DefaultButton>
      </div> */}
    </div>
  );
}

function BrandNewsContainer({ brand }) {
  return (
    <div className={styles.brand_news_container}>
      <img
        src={brand?.brandThumbnail}
        className={styles.brand_news_thumbnail}
      />
      <div className={styles.brand_info_wrap}>
        <div>
          <h3>{brand?.brandName}</h3>
          <p>{brand?.copyright}</p>
        </div>
        <ChevronRight />
      </div>
      <ScrollableSlider>
        {brand?.items.map((item, index) => (
          <img
            key={index}
            src={item?.thumbnail}
            alt=""
            className={styles.brand_item}
          />
        ))}
      </ScrollableSlider>
    </div>
  );
}
