import { useEffect, useState } from "react";

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

  const formatDateTime = (date) =>
    DateTime.fromISO(date).toFormat("yyyy-MM-dd'T'HH:mm:ss");
  const parseDate = (date) => DateTime.fromFormat(date, "yyyy-MM-dd").toISO();

  const [startDate, setStartDate] = useState(() =>
    getInitialDate(searchParams, startKey, defaultStartDate),
  );
  const [endDate, setEndDate] = useState(() =>
    getInitialDate(searchParams, endKey, defaultEndDate),
  );

  function getInitialDate(params, key, defaultDate) {
    const queriedDate = params.get(key);
    return queriedDate || formatDateTime(parseDate(defaultDate));
  }

  function updateDate(key, newDate) {
    if (key === startKey) {
      setStartDate(formatDateTime(newDate));
    } else if (key === endKey) {
      setEndDate(formatDateTime(newDate));
    }
  }

  useEffect(() => {
    const updatedParams = new URLSearchParams(searchParams);
    let hasChanges = false;

    if (startDate !== searchParams.get(startKey)) {
      updatedParams.set(startKey, startDate);
      hasChanges = true;
    }

    if (endDate !== searchParams.get(endKey)) {
      updatedParams.set(endKey, endDate);
      hasChanges = true;
    }

    if (hasChanges) {
      navigate("?" + updatedParams.toString(), { replace: true });
    }
  }, [startDate, endDate, searchParams, navigate, startKey, endKey]);

  return [
    startDate,
    endDate,
    (newStartDate) => updateDate(startKey, newStartDate),
    (newEndDate) => updateDate(endKey, newEndDate),
  ];
}
