import React, { useEffect, useMemo, useState } from "react";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import classNames from "classnames";
import { categoryList, getSubCategory } from "models/category";
import { Device } from "models/device";
import { useNavigate } from "react-router-dom";

import useEventsQuery from "hooks/query/useEventsQuery";
import useLookBookQuery from "hooks/query/useLookBookQuery";
import { useUserDevice } from "hooks/size/useUserDevice";

import { LoadingLayer, MobileLayout } from "components/common";
import { ToastModal } from "components/modal";
import { ScrollableSlider } from "components/slider";

import { formatDateTime } from "utilities/dateTime";

import styles from "styles/_category.module.scss";

export default function CategoryMenu() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  const [toastMessage, setToastMessage] = useState("");

  const navigation = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(categoryList[0]);

  const [category, setCategory] = useState([]);

  const updateCategory = useMemo(
    () =>
      setCategory(
        getSubCategory(selectedCategory)
          .slice(1)
          .map((e) => {
            return { ...e, toggle: false };
          }),
      ),
    [selectedCategory],
  );

  const { data: lookbooks, isLoading } = useLookBookQuery({
    offset: 0,
    limit: 5,
  });
  const { data: events, isLoading: eventLoading } = useEventsQuery({
    offset: 0,
    limit: 5,
  });

  const itemCardStyle = {
    flex: "0 0 calc(95% - 10px)",
    marginRight: 10,
  };

  useEffect(() => {
    if (isDeskTop) navigation(-1);
  }, [isDeskTop]);

  if (isLoading || eventLoading) return <LoadingLayer />;

  return (
    <MobileLayout headerTitle="CATEGORY" isBottomNavigation={true}>
      <div className={styles.category_menu_container}>
        <img
          src={require("assets/images/event/event4.png")}
          className={styles.event_banner}
        />
        <div className={styles.category_wrapper}>
          {categoryList.map((category) => (
            <p
              className={classNames({
                [styles.current_category]: selectedCategory == category,
              })}
              onClick={() => setSelectedCategory(category)}
            >
              {category.toUpperCase()}
            </p>
          ))}
        </div>
        <div className={styles.sub_category_container}>
          {category?.map((cate) => (
            <div className={styles.sub_category_wrapper}>
              <div
                className={styles.first_depth}
                onClick={() => {
                  setCategory(
                    category.map((cate1) =>
                      cate1.id == cate.id
                        ? { ...cate1, toggle: !cate.toggle }
                        : cate1,
                    ),
                  );
                }}
              >
                <p>{cate.label}</p>
                {cate.toggle ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />}
              </div>
              {cate.toggle && (
                <div className={styles.second_depth}>
                  {cate?.depth.map((cate2) => (
                    <p
                      onClick={() =>
                        navigation(
                          `/category/${selectedCategory}${cate2.id > 0 ? "?" + cate2.id : ""}`,
                        )
                      }
                    >
                      {cate2.label}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.category_section_wrapper}>
          <div className={styles.category_section_header}>
            <p className={styles.category_section_title}>Event</p>
            <p
              className={styles.category_section_more}
              onClick={() => navigation("/event")}
            >
              View ALL <ArrowRightAltOutlinedIcon />
            </p>
          </div>
          <div className={styles.category_section_body}>
            <ScrollableSlider>
              {events?.data?.map((event, index) => {
                return (
                  <div
                    key={index}
                    style={itemCardStyle}
                    className={styles.category_section_card}
                    onClick={() => setToastMessage("준비중입니다.")}
                  >
                    <img
                      src={event.thumbnail}
                      className={styles.section_body_thumbnail}
                    />
                    <div className={styles.category_section_content}>
                      <em className={styles.section_body_title}>
                        {event.title}
                      </em>
                      <p>
                        {formatDateTime(event?.startedAt, "yyyy.M.d")} ~
                        {formatDateTime(event?.endedAt, "yyyy.M.d")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </ScrollableSlider>
          </div>
        </div>
        <div className={styles.category_section_wrapper}>
          <div className={styles.category_section_header}>
            <p className={styles.category_section_title}>Lookbook</p>
            <p
              className={styles.category_section_more}
              onClick={() => navigation("/lookbook")}
            >
              View ALL <ArrowRightAltOutlinedIcon />
            </p>
          </div>
          <div className={styles.category_section_body}>
            <ScrollableSlider>
              {lookbooks?.data?.map((lookbook, index) => {
                return (
                  <div
                    key={index}
                    style={itemCardStyle}
                    className={styles.category_section_card}
                    onClick={() => setToastMessage("준비중입니다.")}
                  >
                    <img
                      src={lookbook.thumbnail}
                      className={styles.section_body_thumbnail}
                    />

                    <p
                      style={{ color: "black", marginTop: "-8px" }}
                      className={styles.section_body_title}
                    >
                      {lookbook.title}
                    </p>
                  </div>
                );
              })}
            </ScrollableSlider>
          </div>
        </div>
      </div>
      {toastMessage && (
        <ToastModal
          toastMessage={toastMessage}
          setToastMessage={setToastMessage}
        />
      )}
    </MobileLayout>
  );
}
