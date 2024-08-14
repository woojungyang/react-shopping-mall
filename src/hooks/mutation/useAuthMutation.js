import { useMutation } from 'react-query';
import { ApiClientQuery } from '../apiClient/useApiClient';

// eslint-disable-next-line import/no-anonymous-default-export
export default function useAuthMutation(options = {}) {
  const url = `/api/v1/auth/tokens`;

  return useMutation(
    [url],
    body => ApiClientQuery({ url: url, method: 'post', data: body }),
    options
  );
}
