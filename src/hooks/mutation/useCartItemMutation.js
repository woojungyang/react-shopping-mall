import { useMutation } from "react-query";

import { ApiClientQuery } from "../apiClient/useApiClient";

export default function useCartItemMutation(id, options = {}) {
  const url = `/api/v1/cart/items/${id}`;
  return useMutation(
    (body) => ApiClientQuery({ url: url, method: "patch", data: body }),
    options,
  );
}
