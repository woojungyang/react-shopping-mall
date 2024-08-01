import { useEffect } from "react";

import { DateTime } from "luxon";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function useDateIntervalQueryString(
  startKey,
  endKey,
  defaultStartDate = "",
  defaultEndDate = "",
) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchedStartDate = searchParams.get(startKey);
  const searchedEndDate = searchParams.get(endKey);

  const formatDateTime = (date) =>
    DateTime.fromISO(date).toFormat("yyyy-MM-dd'T'HH:mm:ss");

  const parseDate = (date) => DateTime.fromFormat(date, "yyyy-MM-dd").toISO();

  const changeDate = (key, newValue) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(key, formatDateTime(newValue));
    navigate("?" + newSearchParams.toString(), { replace: true });
  };

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    let updated = false;

    if (!searchedStartDate && defaultStartDate) {
      newSearchParams.set(
        startKey,
        formatDateTime(parseDate(defaultStartDate)),
      );
      updated = true;
    }

    if (!searchedEndDate && defaultEndDate) {
      newSearchParams.set(endKey, formatDateTime(parseDate(defaultEndDate)));
      updated = true;
    }

    if (updated) {
      navigate("?" + newSearchParams.toString(), { replace: true });
    }
  }, [
    searchedStartDate,
    searchedEndDate,
    defaultStartDate,
    defaultEndDate,
    startKey,
    endKey,
    searchParams,
    navigate,
  ]);

  return [
    searchedStartDate || formatDateTime(parseDate(defaultStartDate)),
    searchedEndDate || formatDateTime(parseDate(defaultEndDate)),
    (newStartDate) => changeDate(startKey, newStartDate),
    (newEndDate) => changeDate(endKey, newEndDate),
  ];
}
