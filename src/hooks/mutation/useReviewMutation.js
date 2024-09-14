import { useMutation } from "react-query";

import { ApiClientQuery } from "../apiClient/useApiClient";

export default function useReviewMutation(id, method = "patch", options = {}) {
  const url = `/api/v1/review/${id}`;
  return useMutation(
    (body) => ApiClientQuery({ url: url, method: method, data: body }),
    options,
  );
}
