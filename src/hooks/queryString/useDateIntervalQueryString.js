import { useState } from "react";

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

  const [startDate, setStartDate] = useState(
    () => searchParams.get(startKey) || formatDateTime(defaultStartDate),
  );
  const [endDate, setEndDate] = useState(
    () => searchParams.get(endKey) || formatDateTime(defaultEndDate),
  );

  const updateDates = (newStartDate, newEndDate) => {
    const formattedStartDate = formatDateTime(newStartDate);
    const formattedEndDate = formatDateTime(newEndDate);

    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(startKey, formattedStartDate);
    updatedParams.set(endKey, formattedEndDate);

    navigate("?" + updatedParams.toString(), { replace: true });

    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
  };

  return [startDate, endDate, updateDates];
}
