import { useQuery } from "react-query";

import { ApiClientQuery } from "../apiClient/useApiClient";

// eslint-disable-next-line import/no-anonymous-default-export
export default function useKeywordsQuery(options = {}) {
  const url = `/api/v1/keywords`;
  return useQuery(
    [url],
    () => ApiClientQuery({ url: url, method: "get" }),
    options,
  );
}
