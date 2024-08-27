import { useMutation } from "react-query";

import { ApiClientQuery } from "../apiClient/useApiClient";

export default function useCartItemsMutation(options = {}) {
  const url = `/api/v1/cart/items`;
  return useMutation(
    (body) => ApiClientQuery({ url: url, method: "post", data: body }),
    options,
  );
}
