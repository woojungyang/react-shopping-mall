import React, { useEffect } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

export default function useQueryString(key, defaultValue = "") {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchedQueryString = searchParams.get(key);

  function change(newValue) {
    searchParams.set(key, newValue);
    setSearchParams(searchParams);
    navigate("?" + searchParams.toString());
  }

  useEffect(() => {
    if (!searchedQueryString && defaultValue) {
      change(defaultValue);
    }
  }, [searchedQueryString, defaultValue]);

  return [searchedQueryString || "", change];
}
