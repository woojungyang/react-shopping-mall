import { useQuery } from "react-query";

import { ApiClientQuery } from "../apiClient/useApiClient";

// eslint-disable-next-line import/no-anonymous-default-export
export default function useItemReviewsQuery(id, query, options = {}) {
  // console.log(query);
  const url = `/api/v1/item/${id}/reviews`;
  return useQuery(
    [url, query],
    () => ApiClientQuery({ url: url, params: query, method: "get" }),
    options,
  );
}
