import React from "react";

import { el } from "@faker-js/faker";
import classNames from "classnames";
import { Device } from "models/device";
import { EventType, getEventTypeLabel } from "models/event";

import useEventsQuery from "hooks/query/useEventsQuery";
import usePageQueryString from "hooks/queryString/usePageQueryString";
import useQueryString from "hooks/queryString/useQueryString";
import { useUserDevice } from "hooks/size/useUserDevice";

import { CommonLayout } from "components/common";

import { formatDateTime } from "utilities/dateTime";

import styles from "styles/_event.module.scss";

export default function Event() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  const [{ page, perPage: limit, offset }, changePage, getPageCount] =
    usePageQueryString("page", 20);
  const handleChangePage = (_event, page) => changePage(page);

  const [type, changeType] = useQueryString("type", 0);

  const { data: events, isLoading } = useEventsQuery({
    offset: offset,
    limit: limit,
    type: type,
  });

  return (
    <CommonLayout isLoading={isLoading}>
      <div className={styles.event_container}>
        <p className={styles.event_title}>이벤트</p>

        <div className={styles.event_filter_wrap}>
          {[0, ...Object.values(EventType)].map((eventType) => (
            <div
              className={classNames({
                [styles.current_type]: type == eventType,
              })}
              onClick={() => changeType(eventType)}
            >
              <p>{getEventTypeLabel(eventType)}</p>
            </div>
          ))}
        </div>
        <div
          className={classNames({
            [styles.events_wrapper]: isDeskTop,
            [styles.events_wrapper_mb]: !isDeskTop,
          })}
        >
          {events?.total > 0 ? (
            events?.data.map((event, index) => (
              <div key={index} className={styles.event_card}>
                <div className={styles.event_thumbnail_wrap}>
                  <img src={event.thumbnail} />
                  <span className={styles.event_badge}>
                    {getEventTypeLabel(event.type)}
                  </span>
                </div>
                <p className={styles.event_card_title}>{event.title}</p>
                <p className={styles.event_card_subtitle}>{event.subTitle}</p>
                <p className={styles.event_card_period}>
                  {formatDateTime(event?.startedAt, "yyyy.MM.dd")}~{" "}
                  {formatDateTime(event?.endedAt, "yyyy.MM.dd")}
                </p>
              </div>
            ))
          ) : (
            <div className={styles.event_empty_wrap}>
              <p>진행중인 이벤트가 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </CommonLayout>
  );
}
