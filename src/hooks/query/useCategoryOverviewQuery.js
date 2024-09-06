import { useQuery } from "react-query";

import { ApiClientQuery } from "../apiClient/useApiClient";

// eslint-disable-next-line import/no-anonymous-default-export
export default function useCategoryOverviewQuery(params = {}, options = {}) {
  const url = `/api/v1/category-overview`;
  return useQuery(
    [url, params],
    () => ApiClientQuery({ url: url, method: "get", params: params }),
    options,
  );
}
