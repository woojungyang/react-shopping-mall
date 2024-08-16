import { useQuery } from "react-query";

import { ApiClientQuery } from "../apiClient/useApiClient";

// eslint-disable-next-line import/no-anonymous-default-export
export default function useItemsQuery(query, options = {}) {
  const url = `/api/v1/items`;
  return useQuery(
    [url, query],
    () => ApiClientQuery({ url: url, params: query, method: "get" }),
    options,
  );
}
