import { useMutation } from "react-query";

import { ApiClientQuery } from "../apiClient/useApiClient";

// eslint-disable-next-line import/no-anonymous-default-export
export default function useCreateUserMutation(options = {}) {
  const url = `/api/v1/users/password`;

  return useMutation(
    [url],
    (body) => ApiClientQuery({ url: url, method: "patch", data: body }),
    options,
  );
}
