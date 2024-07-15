import React, { useMemo, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import RemoveIcon from "@mui/icons-material/Remove";
import { Rating } from "@mui/material";
import classNames from "classnames";
import { numberWithCommas } from "utilities";

import { LikeHeart } from "components/card";
import { ImageZoomSlider, ScrollableSlider } from "components/slider";

import { formatDateTime, now } from "utilities/dateTime";

import styles from "styles/_detail.module.scss";

export default function ItemDetailContent() {
  const colorOptions = [...new Array(3)];

  const [showDelivery, setShowDelivery] = useState(false);
  const today = useMemo(() => formatDateTime(now(), "MM월dd일-w"), []);

  const [selectedItemOptions, setSelectedOptions] = useState({
    color: 0,
    quantity: 1,
  });

  const sizeOptions = [...new Array(5)];
  const disabled_size = 4;

  return (
    <div className={styles.detail_container}>
      <div className={styles.item_information_wrapper}>
        <div className={styles.images_slider_wrapper}>
          <ImageZoomSlider />
        </div>
        <div className={styles.item_information_wrapper}>
          <div className={styles.item_information_wrap}>
            <div className={styles.item_header_icon_wrapper}>
              <LikeHeart
                defaultColor="dark"
                position={{ position: "relative" }}
              />
              {/* <ShareOutlinedIcon /> */}
              9.1만
            </div>
            <div className={styles.item_header_wrapper}>
              <span className={styles.item_brand_name}>
                brandName | WXWP30644-BKS{" "}
              </span>
              <h1 className={styles.item_name}>자가드 포켓 우븐 팬츠</h1>
            </div>

            <div className={styles.price_information_wrapper}>
              <span className={styles.total_price}>
                {numberWithCommas(149000)}원
              </span>
              <p>
                <span className={styles.original_price}>
                  {numberWithCommas(149000)}원
                </span>
                <span className={styles.sale_percent}>20%</span>
              </p>
            </div>
            <DetailContentWrapper border={true}>
              <div
                onClick={() => setShowDelivery(!showDelivery)}
                className={styles.detail_delivery_wrapper}
              >
                <div className={styles.detail_delivery_wrap}>
                  <p>
                    무료배송 <br />
                    <span className={styles.delivery_description}>
                      <span className={styles.delivery_}>{today} 도착예정</span>{" "}
                      (지금 결제 시)
                    </span>
                  </p>
                  {showDelivery ? (
                    <ExpandLessOutlinedIcon />
                  ) : (
                    <ExpandMoreOutlinedIcon />
                  )}
                </div>
                {showDelivery && (
                  <div className={styles.delivery_hidden_wrapper}>
                    <li>
                      15시 이전에 결제하시면 다음날에 받으실 수
                      있습니다.(주말/공휴일은 제외)
                    </li>
                    <li>
                      도서산간 및 일부 지역은 택배사 사정에 따라 배송이 늦어질
                      수 있습니다.
                    </li>
                    <li>
                      일부 도서/산간 지역에는 배송비가 추가될 수 있습니다.
                    </li>
                  </div>
                )}
              </div>
            </DetailContentWrapper>
            <DetailContentWrapper title="리뷰" border={true}>
              <div className={styles.detail_review_content}>
                <div className={styles.detail_start_wrap}>
                  <Rating
                    name="half-rating-read"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                  />

                  <p>4.0</p>
                </div>
                <p className={styles.review_flag_button}>
                  {numberWithCommas(1)} 리뷰 보기
                </p>
              </div>
            </DetailContentWrapper>
            <DetailContentWrapper title="COLOR">
              <div className={styles.color_options_wrapper}>
                <p className={styles.selected_option_name}>
                  {selectedItemOptions?.color}
                </p>
                <ScrollableSlider>
                  {colorOptions.map((option, index) => {
                    const isSelected = selectedItemOptions.color == index;
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedOptions({
                            ...selectedItemOptions,
                            color: isSelected ? null : index,
                          });
                        }}
                        className={classNames({
                          [styles.detail_color_options]: true,
                          [styles.selected_color_option]: isSelected,
                        })}
                      >
                        <img
                          src={require("assets/images/sub/sub24.jpg")}
                          className={styles.color_option_thumbnail}
                          style={{
                            height: 70,
                            flex: "0 0 calc(6%)",
                            width: 50,
                          }}
                        />
                      </div>
                    );
                  })}
                </ScrollableSlider>
              </div>
            </DetailContentWrapper>
            <DetailContentWrapper title="SIZE">
              <p className={styles.selected_option_name}>
                {selectedItemOptions?.size}
              </p>
              <div className={styles.size_options_wrapper}>
                {sizeOptions.map((size, index) => {
                  const isSelected = selectedItemOptions.size == index;
                  return (
                    <p
                      onClick={() =>
                        setSelectedOptions({
                          ...selectedItemOptions,
                          size: isSelected ? null : index,
                        })
                      }
                      className={classNames({
                        [styles.size_option]: true,
                        [styles.selected_size_option]: isSelected,
                        [styles.size_option_disabled]: disabled_size == index,
                      })}
                    >
                      {index}
                    </p>
                  );
                })}
              </div>
            </DetailContentWrapper>
            <DetailContentWrapper>
              <div className={styles.detail_quantity_wrapper}>
                <div
                  className={styles.quantity_button}
                  onClick={() => {
                    if (selectedItemOptions.quantity > 1)
                      setSelectedOptions({
                        ...selectedItemOptions,
                        quantity: selectedItemOptions.quantity - 1,
                      });
                  }}
                >
                  <RemoveIcon />
                </div>
                <input type="number" value={selectedItemOptions?.quantity} />
                <div
                  className={styles.quantity_button}
                  onClick={() => {
                    setSelectedOptions({
                      ...selectedItemOptions,
                      quantity: selectedItemOptions.quantity + 1,
                    });
                  }}
                >
                  <AddIcon />
                </div>
              </div>
            </DetailContentWrapper>

            <button className={styles.button_dark_300_color_background_100}>
              주문하기
            </button>
            <button
              className={styles.button_background_100_outline_mb_color_dark_300}
            >
              장바구니
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailContentWrapper({ children, title = "", border = false }) {
  return (
    <div
      className={styles.detail_content_wrapper}
      style={{ borderBottom: border ? "1px solid #b6b5b5" : "" }}
    >
      {title && <p className={styles.detail_title}>{title}</p>}

      <div className={styles.detail_content_wrap}>{children}</div>
    </div>
  );
}
