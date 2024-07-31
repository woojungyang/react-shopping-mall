import { useEffect } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

export default function useDateIntervalQueryString(
  startKey,
  endKey,
  defaultStart = "",
  defaultEnd = "",
) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const startQueryString = searchParams.get(startKey);
  const endQueryString = searchParams.get(endKey);

  function changeDate(key, newValue) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(key, newValue);

    navigate("?" + newSearchParams.toString(), { replace: true });
  }

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (!startQueryString && defaultStart) {
      newSearchParams.set(startKey, defaultStart);
    }

    if (!endQueryString && defaultEnd) {
      newSearchParams.set(endKey, defaultEnd);
    }

    if (newSearchParams.toString() !== searchParams.toString()) {
      navigate("?" + newSearchParams.toString(), { replace: true });
    }
  }, [
    startQueryString,
    endQueryString,
    defaultStart,
    defaultEnd,
    startKey,
    endKey,
    searchParams,
    navigate,
  ]);

  return [
    startQueryString || defaultStart,
    endQueryString || defaultEnd,
    (newStartDate) => changeDate(startKey, newStartDate),
    (newEndDate) => changeDate(endKey, newEndDate),
  ];
}
