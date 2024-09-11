import React, { useMemo, useRef, useState } from "react";

import { ChevronRight } from "@mui/icons-material";
import AppleIcon from "@mui/icons-material/Apple";
import InstagramIcon from "@mui/icons-material/Instagram";
import ShopIcon from "@mui/icons-material/Shop";
import YouTubeIcon from "@mui/icons-material/YouTube";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { addLeadingZero } from "utilities";

import { ItemCard, SmallCard } from "components/card";
import { DefaultButton } from "components/common";
import {
  ChevronArrows,
  CustomSliderContainer,
  FlexBoxSlider,
  ImageSlider,
} from "components/slider";

import { calculatePercent } from "utilities/calculatePercent";
import { formatDateTime } from "utilities/dateTime";

import styles from "styles/_main.module.scss";

export default function MainContent({ data }) {
  const navigation = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const progressBarWidth = useRef(null);

  const forUCategories = [
    { id: 1, name: "WOMAN" },
    { id: 2, name: "MAN" },
    { id: 3, name: "BAG&SHOES" },
    { id: 4, name: "ACC" },
    { id: 5, name: "LIFT" },
  ];
  const [selectedForUCategory, setSelectedForUCategory] = useState(
    forUCategories[0].id,
  );

  const mdPickRef = useRef(null);

  const styleMenu = [
    { id: 1, name: "ALL" },
    { id: 2, name: "WOMAN" },
    { id: 3, name: "MAN" },
    { id: 4, name: "LIFE" },
    { id: 5, name: "BEAUTY" },
  ];
  const [activeStyleCategory, setActiveStyleCategory] = useState(1);

  const mainSlide = useMemo(() => data?.mainSlide || [], [data]);
  const bestItems = useMemo(() => data?.bestItems || [], [data]);

  const mdChoice = useMemo(() => data?.mdChoice || {}, [data]);
  const events = useMemo(() => data?.events || [], [data]);
  const clearances = useMemo(() => data?.clearances || {}, [data]);
  const recommendedItems = useMemo(() => data?.recommendedItems || [], [data]);
  const brands = useMemo(() => data?.brands || [], [data]);
  const brandEvents = useMemo(() => data?.brandEvents || [], [data]);
  const notices = useMemo(() => data?.notices || [], [data]);
  const userStyles = useMemo(() => data?.userStyles || [], [data]);

  if (!data) return null;

  return (
    <div className={styles.main_image_container}>
      <div style={{ position: "relative" }}>
        <ImageSlider
          images={data?.mainSlide}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <div className={styles.main_slider_wrapper}>
          <div style={{ position: "relative" }}>
            <div className={styles.main_slider_bottom}></div>
            <div
              className={styles.main_slider_percent}
              ref={progressBarWidth}
              style={{
                width:
                  calculatePercent(currentIndex, mainSlide?.length || 0) + "%",
              }}
            ></div>
          </div>
          <p className={styles.slider_index}>
            {addLeadingZero(currentIndex + 1)} /
            {addLeadingZero(mainSlide?.length || 0)}
          </p>
        </div>
      </div>
      {/* mark it */}
      <div className={styles.default_section}>
        <h4 className={styles.section_title}>MARK IT</h4>
        <FlexBoxSlider
          settings={{
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
          }}
        >
          {bestItems.map((item, index) => {
            return (
              <div key={index}>
                <ItemCard
                  item={item}
                  style={{
                    height: "400px",
                  }}
                />
              </div>
            );
          })}
        </FlexBoxSlider>
      </div>
      {/* mdpick */}
      <div className={styles.md_pick_wrapper}>
        <h4 className={styles.section_title}>BEAUTY CHOICE+</h4>
        <div className={styles.md_pick_wrap}>
          <div className={styles.md_pick_slider}>
            <CustomSliderContainer
              autoPlay={true}
              ref={mdPickRef}
              settings={{
                infinite: true,
                speed: 1000,
                slidesToShow: 1,
                slidesToScroll: 1,
              }}
            >
              {mdChoice?.banners?.map((banner, index) => (
                <div className={styles.md_pick_banner} key={index}>
                  <div className={styles.banner_copyright_wrap}>
                    <h1>AD COPYRIGHT{index}</h1>
                    <p>ad description</p>
                    <DefaultButton
                      label="ad button"
                      className={styles.button_transparent_color_background_100}
                    />
                  </div>
                  <img src={banner?.url} className={styles.slider_image} />
                </div>
              ))}
            </CustomSliderContainer>
            <ChevronArrows
              style={{
                width: "90%",
                iconOptions: {
                  width: 40,
                  height: 60,
                  color: "rgba(255,255,255,0.9)",
                },
              }}
              onClickPrev={() => {
                mdPickRef.current.slickPrev();
              }}
              onClickNext={() => {
                mdPickRef.current.slickNext();
              }}
            />
          </div>
          <div className={styles.md_pick_item_wrap}>
            {mdChoice?.items?.map((item, index) => {
              return (
                <div key={index}>
                  <ItemCard
                    showStatus={true}
                    item={item}
                    style={{
                      height: "369px",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* spotlight */}
      <div className={styles.spotlight_container}>
        <h4 className={styles.section_title}>SPOTLIGHT</h4>
        <div className={styles.spotlight_wrapper}>
          {events?.map((event, index) => (
            <div className={styles.spotlight_wrap} key={index}>
              <img src={event?.thumbnail} />
              <p className={styles.spotlight_title}>{event?.title}</p>
              <p className={styles.spotlight_subtitle}>{event?.subTitle}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.event_banner_container}>
        <img src={require("assets/images/common/banner.jpg")} />
      </div>
      {/* sale */}
      <div className={styles.sale_items_wrapper}>
        <h4 className={styles.section_title}>CLEARANCE</h4>
        <FlexBoxSlider
          arrows={false}
          totalCount={clearances?.items?.length || 0}
          settings={{
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
          }}
          banner={() => {
            return (
              <div className={styles.sale_banner_wrap}>
                <img src={clearances?.banner?.url} />
                <div className={styles.sale_banner_copyright}>
                  <p>subTitle</p>
                  <h1 className={styles.copyright_title}>AD COPYRIGHT</h1>
                </div>
              </div>
            );
          }}
        >
          {clearances?.items?.map((item, index) => {
            return (
              <div key={index}>
                <ItemCard
                  item={item}
                  style={{
                    marginTop: 50,
                    height: "320px",
                  }}
                />
              </div>
            );
          })}
        </FlexBoxSlider>
      </div>
      {/* for u */}
      <div className={styles.for_u_wrapper}>
        <div className={styles.slider_subtitle_wrapper}>
          <h4 className={styles.section_title}>FOR U</h4>
        </div>
        <div className={styles.for_u_items_wrap}>
          <div className={styles.for_u_item_category_wrap}>
            {forUCategories.map((category, index) => (
              <p
                key={index}
                onClick={() => setSelectedForUCategory(category.id)}
                className={classNames({
                  [styles.item_category]: true,
                  [styles.category_active]: selectedForUCategory == category.id,
                })}
              >
                {category.name}
              </p>
            ))}
          </div>
          <FlexBoxSlider
            settings={{
              infinite: true,
              speed: 500,
              rows: 2,
              slidesToShow: 5,
              slidesToScroll: 5,
            }}
          >
            {recommendedItems?.map((item, index) => (
              <div key={index}>
                <ItemCard
                  item={item}
                  style={{
                    height: "390px",
                    marginBottom: index % 1 == 0 ? "30px" : "",
                  }}
                />
              </div>
            ))}
          </FlexBoxSlider>
        </div>
      </div>
      {/* brand */}
      <div className={styles.brand_container}>
        <h4 className={styles.section_title}>BRAND NEWS</h4>
        <div className={styles.brand_wrapper}>
          {brands.map((brand, index) => {
            return (
              <div
                key={index}
                className={classNames({
                  [styles.brand_wrap]: true,
                })}
              >
                <img
                  className={styles.brand_thumbnail}
                  src={brand?.brandThumbnail}
                  className={styles.brand_thumbnail}
                />

                <div className={styles.brand_info_wrap}>
                  <div className={styles.brand_info}>
                    <div>
                      <p className={styles.brand_name}>{brand?.brandName}</p>
                      <p>{brand?.copyright}</p>
                    </div>
                    <ChevronRight />
                  </div>
                  <div className={styles.items_list_wrapper}>
                    {brand?.items.map((item, index) => (
                      <ItemCard
                        key={index}
                        item={item}
                        showBrand={false}
                        showOriginalPrice={false}
                        style={{ height: 240, flex: "0 0 calc(48% - 10px)" }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.gallery_container}>
        <h4 className={styles.section_title}>DEEP IN FOCUS</h4>
        <div className={styles.selected_keyword_item_wrapper}>
          {brandEvents?.map((brandEvent, index) => (
            <div key={index} className={styles.selected_keyword_item_wrap}>
              <div className={styles.brand_thumbnail_wrap}>
                <img
                  src={brandEvent?.brandThumbnail}
                  className={styles.item_thumbnail}
                />
                <div className={styles.brand_copyright_wrap}>
                  <h2>{brandEvent?.brandName}</h2>
                  <p>{brandEvent?.copyright}</p>
                </div>
              </div>
              <div style={{ padding: "16px" }}>
                {brandEvent?.items.map((item, index) => (
                  <SmallCard key={index} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* style */}
      <div className={styles.style_container}>
        <h4 className={styles.section_title}> STYLE</h4>

        <div className={styles.style_menu_wrap}>
          {styleMenu.map((menu, index) => (
            <p
              key={index}
              onClick={() => setActiveStyleCategory(menu.id)}
              className={classNames({
                [styles.style_menu]: true,
                [styles.active_style_menu]: activeStyleCategory == menu.id,
              })}
            >
              {menu.name}
            </p>
          ))}
        </div>

        <div className={styles.style_image_wrapper}>
          {userStyles?.map((userStyle, index) => (
            <div className={styles.image_wrap} key={index}>
              <img src={userStyle?.avatar} className={styles.style_image} />
              <p className={styles.user_name}>
                @{userStyle?.username?.split("@")[0]}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* notice */}
      <div className={styles.notice_container}>
        <div className={styles.information_wrapper}>
          <h4 className={styles.information_title}>SERVICE CENTER 2015-0907</h4>
          <p className={styles.information_subtitle}>
            MON - FRI 09 : 00 - 18:00 | 주말, 공휴일 휴무 | BREAK TIME : 12:30 -
            13:30
            <br />
            cs_help@WOOTEEK.co.kr
          </p>
          <div className={styles.information_button_wrapper}>
            <div>
              <DefaultButton
                className={styles.information_button}
                label="FAQ"
              />
              <DefaultButton
                className={styles.information_button}
                label="1:1문의"
              />
            </div>
            <div className={styles.default_flex}>
              <SnsWrapper>
                <InstagramIcon className={styles.sns_icon} />
              </SnsWrapper>
              <SnsWrapper>
                <YouTubeIcon className={styles.sns_icon} />
              </SnsWrapper>
              <SnsWrapper>
                <AppleIcon className={styles.sns_icon} />
              </SnsWrapper>
              <SnsWrapper>
                <ShopIcon className={styles.sns_icon} />
              </SnsWrapper>
            </div>
          </div>
        </div>
        <div className={styles.default_flex_space}>
          <div className={styles.notice_wrapper}>
            <div className={styles.default_flex_space}>
              <p className={styles.notice_title}>NOTICE</p>
              <span
                style={{ fontSize: 12, cursor: "pointer" }}
                onClick={() => navigation("/mypage/cscenter/notice")}
              >
                more
              </span>
            </div>
            <div>
              {notices?.map((notice, index) => (
                <div key={index} className={styles.default_flex_space}>
                  <p className={styles.notice_content_title}>{notice?.title}</p>
                  <p
                    className={styles.notice_content_title}
                    style={{ flexShrink: 0, marginLeft: 20 }}
                  >
                    {formatDateTime(notice?.writtenAt)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.bottom_navigation_wrapper}>
            <div className={styles.bottom_navigation_item}>
              <p>ABOUT US</p>
              <p>WOOTEEK 소개</p>
              <p>SITE MAP</p>
            </div>
            <div className={styles.bottom_navigation_item}>
              <p>MY ORDER</p>
              <p>주문 배송</p>
              <p>상품 리뷰 내역</p>
            </div>
            <div className={styles.bottom_navigation_item}>
              <p>NEED HELP</p>
              <p>1:1문의 내역</p>
              <p>주문 문의</p>
              <p>FQA</p>
              <p onClick={() => navigation("/mypage/cscenter/notice")}>
                공지사항
              </p>
              <p>고객의 소리</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SnsWrapper({ children }) {
  return <div className={styles.sns_wrapper}>{children}</div>;
}
