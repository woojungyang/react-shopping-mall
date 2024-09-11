import { useQuery } from "react-query";

import { ApiClientQuery } from "../apiClient/useApiClient";

// eslint-disable-next-line import/no-anonymous-default-export
export default function useNoticesQuery(params = {}, options = {}) {
  const url = `/api/v1/notices`;
  return useQuery(
    [url, params],
    () => ApiClientQuery({ url: url, params: params, method: "get" }),
    options,
  );
}
