import { useMutation } from "react-query";

import { ApiClientQuery } from "../apiClient/useApiClient";

export default function useCreateReviewMutation(options = {}) {
  const url = `/api/v1/review`;
  return useMutation(
    (body) => ApiClientQuery({ url: url, method: "post", data: body }),
    options,
  );
}
