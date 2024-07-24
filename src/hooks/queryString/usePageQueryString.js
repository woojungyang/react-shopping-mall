import React from "react";

import useQueryString from "./useQueryString";

export default function usePageQueryString(key = "page", perPage = 15) {
  const [rowPage, changeRowPage] = useQueryString(key, 1);

  const page = parseInt(rowPage);
  const offset = (page - 1) * perPage;
  const changePage = (event, page) => changeRowPage(page.toString());
  const getPageCount = (length = 0) => Math.ceil(length / perPage);

  return [{ page, perPage, offset }, changePage, getPageCount];
}
