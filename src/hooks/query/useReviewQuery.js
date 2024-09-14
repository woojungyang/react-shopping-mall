import { useQuery } from "react-query";

import { ApiClientQuery } from "../apiClient/useApiClient";

// eslint-disable-next-line import/no-anonymous-default-export
export default function useReviewQuery(id = "", params = {}, options = {}) {
  const url = `/api/v1/review/${id}`;

  return useQuery(
    [url, params],
    () =>
      ApiClientQuery({
        url: url,
        method: "get",
      }),
    options,
  );
}
