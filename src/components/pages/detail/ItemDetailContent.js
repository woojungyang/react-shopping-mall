import React from "react";

import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { numberWithCommas } from "utilities";

import { LikeHeart } from "components/card";
import { ScrollableSlider } from "components/slider";

import styles from "styles/_detail.module.scss";

export default function ItemDetailContent() {
  const isSale = true;

  const colorOptions = [...new Array(3)];

  return (
    <div className={styles.detail_container}>
      <div className={styles.item_information_wrapper}>
        <div className={styles.images_slider_wrapper}>슬라이더자리</div>
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
              <div>
                <span className={styles.item_brand_name}>brandName</span>
                <h2 className={styles.item_name}>자가드 포켓 우븐 팬츠</h2>
              </div>
              <div className={styles.review_icon_wrap}>
                <ChatOutlinedIcon /> 0
                <ArrowForwardIosOutlinedIcon />
              </div>
            </div>
            <p className={styles.item_code}>Style Code: WXWP30644-BKS</p>
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

              {/* <div className={styles.share_button}>
                <ShareOutlinedIcon />
              </div> */}
            </div>
            <ScrollableSlider>
              {colorOptions.map((option, index) => (
                <img
                  src={require("assets/images/sub/sub24.jpg")}
                  key={index}
                  className={styles.color_option_thumbnail}
                  style={{
                    height: 70,
                    flex: "0 0 calc(6%)",
                    width: 50,
                    border: "1px solid red",
                  }}
                />
              ))}
            </ScrollableSlider>
          </div>
        </div>
      </div>
    </div>
  );
}
