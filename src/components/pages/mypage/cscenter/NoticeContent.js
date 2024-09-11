import React from "react";

import { TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";

import useNoticesQuery from "hooks/query/useNoticesQuery";
import usePageQueryString from "hooks/queryString/usePageQueryString";

import { LoadingLayer } from "components/common";
import { Table } from "components/table";

import { formatDateTime } from "utilities/dateTime";

import styles from "styles/_mypage.module.scss";

export default function NoticeContent({ isDeskTop = true }) {
  const navigation = useNavigate();
  const [{ page, perPage: limit, offset }, changePage, getPageCount] =
    usePageQueryString("page", 10);
  const handleChangePage = (_event, page) => changePage(page);

  const {
    data: notices,
    isLoading,
    isFetching,
  } = useNoticesQuery({
    limit: limit,
    offset: offset,
  });

  if (isLoading || isFetching) return <LoadingLayer />;

  return (
    <div className={styles.notice_table_container}>
      <Table
        page={page}
        total={notices?.total}
        count={getPageCount(notices?.total)}
        handleChangePage={handleChangePage}
        headers={
          isDeskTop
            ? [
                { label: "제목", width: "80%" },
                { label: "등록일", width: "20%" },
              ]
            : []
        }
      >
        {notices?.data.map((notice, index) => (
          <TableRow
            cursor={false}
            key={index}
            onClick={() => navigation(`/notice/${notice.id}`)}
          >
            {isDeskTop ? (
              <>
                <td className={styles.default_table_content}>
                  <p>{notice.title}</p>
                </td>
                <td
                  className={styles.default_table_content}
                  style={{ textAlign: "center" }}
                >
                  {formatDateTime(notice.writtenAt)}
                </td>
              </>
            ) : (
              <td className={styles.default_table_content}>
                <p className={styles.date_mb}>
                  {formatDateTime(notice.writtenAt)}
                </p>
                <p>{notice.title}</p>
              </td>
            )}
          </TableRow>
        ))}
      </Table>
    </div>
  );
}
