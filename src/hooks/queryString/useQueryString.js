import React, { useEffect } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

export default function useQueryString(key, defaultValue = "") {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchedQueryString = searchParams.get(key);

  function change(newValue) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(key, newValue);

    navigate("?" + newSearchParams.toString(), { replace: true });
  }

  useEffect(() => {
    if (!searchedQueryString && defaultValue) {
      change(defaultValue);
    }
  }, [searchedQueryString, defaultValue]);

  return [searchedQueryString || "", change];
}
