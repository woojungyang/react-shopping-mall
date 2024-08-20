import { useQuery } from "react-query";

import { ApiClientQuery } from "../apiClient/useApiClient";

export default function useUserQuery(options = {}) {
  const url = `/api/v1/user`;
  return useQuery(
    [url],
    () => ApiClientQuery({ url: url, method: "get" }),
    options,
  );
}
