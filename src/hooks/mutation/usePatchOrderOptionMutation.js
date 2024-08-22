import { useMutation } from "react-query";

import { ApiClientQuery } from "../apiClient/useApiClient";

// eslint-disable-next-line import/no-anonymous-default-export
export default function usePatchOrderOptionMutation(
  orderId,
  itemId,
  options = {},
) {
  const url = `/api/v1/orders/${orderId}/items/${itemId}/options`;

  return useMutation(
    [url],
    (body) => ApiClientQuery({ url: url, method: "patch", data: body }),
    options,
  );
}
