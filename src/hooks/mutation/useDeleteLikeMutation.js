import { useMutation } from "react-query";

import { ApiClientQuery } from "../apiClient/useApiClient";

export default function useDeleteLikeMutation(id, options = {}) {
  const url = `/api/v1/like/${id}`;
  return useMutation(
    (body) => ApiClientQuery({ url: url, method: "delete", data: body }),
    options,
  );
}
