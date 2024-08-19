import { useMutation } from "react-query";



import { ApiClientQuery } from "../apiClient/useApiClient";


// eslint-disable-next-line import/no-anonymous-default-export
export default function useCreateUserMutation(options = {}) {
  const url = `/api/v1/users`;

  return useMutation(
    [url],
    (body) => ApiClientQuery({ url: url, method: "post", data: body }),
    options,
  );
}