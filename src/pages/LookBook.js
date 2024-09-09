import React from "react";

import classNames from "classnames";
import { Device } from "models/device";

import useLookBookQuery from "hooks/query/useLookBookQuery";
import usePageQueryString from "hooks/queryString/usePageQueryString";
import { useUserDevice } from "hooks/size/useUserDevice";

import { CommonLayout, DefaultPagination } from "components/common";

import styles from "styles/_lookbook.module.scss";

export default function LookBook() {
  const userDevice = useUserDevice();
  const isDeskTop = userDevice == Device.Desktop;

  const [{ page, perPage: limit, offset }, changePage, getPageCount] =
    usePageQueryString("page", 15);
  const handleChangePage = (_event, page) => changePage(page);

  const { data: lookbooks, isLoading } = useLookBookQuery({
    offset: offset,
    limit: limit,
  });

  return (
    <CommonLayout isLoading={isLoading}>
      <div className={styles.lookbook_container}>
        <p className={styles.lookbook_title}>LOOKBOOK</p>

        {lookbooks?.total > 0 ? (
          <>
            <div
              className={classNames({
                [styles.lookbooks_wrapper]: isDeskTop,
                [styles.lookbooks_wrapper_mb]: !isDeskTop,
              })}
            >
              {lookbooks?.data.map((event, index) => (
                <div key={index} className={styles.lookbook_card}>
                  <div className={styles.lookbook_thumbnail_wrap}>
                    <img src={event.thumbnail} />
                    <span className={styles.lookbook_badge}>Lookbook</span>
                  </div>
                  <p className={styles.lookbook_card_title}>{event.title}</p>
                </div>
              ))}
            </div>
            {lookbooks?.total > 0 && (
              <DefaultPagination
                count={getPageCount(lookbooks?.total)}
                page={page}
                onChange={handleChangePage}
              />
            )}
          </>
        ) : (
          <div className={styles.lookbook_empty_wrap}>
            <p>게시된 룩북이 없습니다.</p>
          </div>
        )}
      </div>
    </CommonLayout>
  );
}
