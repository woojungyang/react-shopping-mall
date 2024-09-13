import React, { useEffect, useState } from "react";

import classNames from "classnames";
import { Device } from "models/device";
import { EventType, getEventTypeLabel } from "models/event";
import { numberWithCommas } from "utilities";

import useEventsQuery from "hooks/query/useEventsQuery";
import usePageQueryString from "hooks/queryString/usePageQueryString";
import useQueryString from "hooks/queryString/useQueryString";
import { useUserDevice } from "hooks/size/useUserDevice";

import { CommonLayout, DefaultPagination, SelectBox } from "components/common";

import { formatDateTime } from "utilities/dateTime";

import styles from "styles/_event.module.scss";

export default function Event() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  const [toastMessage, setToastMessage] = useState("");

  const [type, changeType] = useQueryString("type", 0);
  const typeArray = [0, ...Object.values(EventType)];

  const [{ page, perPage: limit, offset }, changePage, getPageCount] =
    usePageQueryString("page", 20);
  const handleChangePage = (_event, page) => changePage(page);

  const { data: events, isLoading } = useEventsQuery({
    offset: offset,
    limit: limit,
    type: type,
  });

  useEffect(() => {
    if (type) changePage(1);
  }, [type]);

  return (
    <CommonLayout
      isLoading={isLoading}
      setToastMessage={setToastMessage}
      toastMessage={toastMessage}
    >
      <div className={styles.event_container}>
        <p className={styles.event_title}>EVENT</p>

        {isDeskTop ? (
          <div className={styles.event_filter_wrap}>
            {typeArray.map((eventType, index) => (
              <div
                key={index}
                className={classNames({
                  [styles.current_type]: type == eventType,
                })}
                onClick={() => changeType(eventType)}
              >
                <p>{getEventTypeLabel(eventType)}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.events_filter_wrap_mb}>
            <p className={styles.events_total}>
              {numberWithCommas(events?.total)} EVENTS{" "}
            </p>
            <SelectBox
              options={typeArray.map((e) => ({
                sort: e,
                label: getEventTypeLabel(e),
              }))}
              selectedValue={type}
              onChange={changeType}
            />
          </div>
        )}
        {events?.total > 0 ? (
          <>
            <div
              className={classNames({
                [styles.events_wrapper]: isDeskTop,
                [styles.events_wrapper_mb]: !isDeskTop,
              })}
            >
              {events?.data.map((event, index) => (
                <div
                  key={index}
                  className={styles.event_card}
                  onClick={() => setToastMessage("페이지 준비중입니다.")}
                >
                  <div className={styles.event_thumbnail_wrap}>
                    <img src={event.thumbnail} />
                    <span className={styles.event_badge}>
                      {getEventTypeLabel(event.type)}
                    </span>
                  </div>
                  <p className={styles.event_card_title}>{event.title}</p>

                  <p className={styles.event_card_period}>
                    {formatDateTime(event?.startedAt, "yyyy.MM.dd")} ~{" "}
                    {formatDateTime(event?.endedAt, "yyyy.MM.dd")}
                  </p>
                </div>
              ))}
            </div>
            {events?.total > 0 && (
              <DefaultPagination
                count={getPageCount(events?.total)}
                page={page}
                onChange={handleChangePage}
              />
            )}
          </>
        ) : (
          <div className={styles.event_empty_wrap}>
            <p>진행중인 이벤트가 없습니다.</p>
          </div>
        )}
      </div>
    </CommonLayout>
  );
}
