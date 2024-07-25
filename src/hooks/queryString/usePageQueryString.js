import React from "react";

import useQueryString from "./useQueryString";

export default function usePageQueryString(key = "page", perPage = 15) {
  const [rowPage, changeRowPage] = useQueryString(key, 1);

  const page = isNaN(parseInt(rowPage)) ? 1 : parseInt(rowPage);
  const offset = (page - 1) * perPage;
  const changePage = (page) => changeRowPage(page.toString());
  const getPageCount = (length = 0) => Math.ceil(length / perPage);

  return [{ page, perPage, offset }, changePage, getPageCount];
}
