import { useQuery } from "react-query";

import { ApiClientQuery } from "../apiClient/useApiClient";

// eslint-disable-next-line import/no-anonymous-default-export
export default function useItemQuery(id = "", itemOptionId = {}, options = {}) {
  const url = `/api/v1/item/${id}`;
  return useQuery(
    [url],
    () => ApiClientQuery({ url: url, params: itemOptionId, method: "get" }),
    options,
  );
}
