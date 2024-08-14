import { useMutation } from "react-query";

import { ApiClientQuery } from "../apiClient/useApiClient";

export default function useCartItemMutation(id, options = {}) {
  const url = `/api/v1/cart/item/${id}`;
  return useMutation(
    (body) => ApiClientQuery({ url: url, method: "post", data: body }),
    options,
  );
}
