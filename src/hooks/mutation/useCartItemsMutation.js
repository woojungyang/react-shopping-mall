import { useMutation } from "react-query";

import { ApiClientQuery } from "../apiClient/useApiClient";

export default function useCartItemsMutation(method = "post", options = {}) {
  const url = `/api/v1/cart/items`;
  return useMutation(
    (body) => ApiClientQuery({ url: url, method: method, data: body }),
    options,
  );
}
