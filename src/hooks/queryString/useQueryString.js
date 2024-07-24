import React from "react";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function useQueryString(key) {
  /* 
  1. 기존쿼리스트링은 가지고있어야함
  2. key ='조회하고자하는 querystring 키'
  newValue = '변경할값',
  defaultValue='기본값'
  3. change함수를 통해, key의 value값을 업데이트
  */

  const navigation = useNavigate();
  const location = useLocation();
  const originalQueryString = location.search.split("?")[1];

  const [searchParams, setSearchParams] = useSearchParams();

  const searchedQueryString = searchParams.get(key);

  function change(newValue) {
    searchParams.set(key, newValue);
    setSearchParams(searchParams);
    navigation(searchParams.toString());
  }

  return [searchedQueryString.length > 1 ? searchedQueryString : "", change];
}
