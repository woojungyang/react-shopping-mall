import React from "react";

import classNames from "classnames";
import { useNavigate, useParams } from "react-router-dom";

import useNoticeQuery from "hooks/query/useNotice";

import { DefaultButton, LoadingLayer } from "components/common";

import { formatDateTime } from "utilities/dateTime";

import styles from "styles/_mypage.module.scss";

export default function NoticeContentDetail({ isDeskTop = true }) {
  const { id } = useParams();
  const navigation = useNavigate();

  const { data: notice, isLoading, isFetching } = useNoticeQuery(id);

  if (isLoading || isFetching) return <LoadingLayer />;

  return (
    <div className={styles.notice_table_container}>
      {isDeskTop && <p className={styles.notice_title}>공지사항</p>}
      <div className={styles.notice_content_wrapper}>
        <div
          className={classNames({
            [styles.notice_content_header]: true,
            [styles.notice_content_header_mb]: !isDeskTop,
          })}
        >
          <p className={styles.notice_content_title}>{notice?.title}</p>
          <p className={styles.notice_written_date}>
            {formatDateTime(notice.writtenAt)}
          </p>
        </div>
        <div
          className={classNames({
            [styles.notice_content]: true,
            [styles.notice_content_mb]: !isDeskTop,
          })}
        >
          {notice?.content}
        </div>
      </div>
      {isDeskTop && (
        <div style={{ paddingLeft: "85%" }}>
          <DefaultButton
            label="목록"
            onClick={() => navigation("/mypage/cscenter/notice")}
          />
        </div>
      )}
    </div>
  );
}
