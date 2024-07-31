import { useEffect } from "react";

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
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, defaultValue);
      navigate("?" + newSearchParams.toString(), { replace: true });
    }
  }, [searchedQueryString, defaultValue, key, searchParams, navigate]);

  return [searchedQueryString || defaultValue, change];
}
