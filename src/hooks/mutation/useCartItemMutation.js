import { useMutation } from "react-query";

import { ApiClientQuery } from "../apiClient/useApiClient";

// eslint-disable-next-line import/no-anonymous-default-export
export default function useCartItemMutation(id, options = {}) {
  const url = `/api/v1/cart/item/${id}`;
  return useMutation(
    (body) => ApiClientQuery({ url: url, method: "post", data: body }),
    options,
  );
}
