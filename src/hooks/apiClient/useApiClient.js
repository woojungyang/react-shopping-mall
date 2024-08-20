import axios from "axios";

import mocking from "../../mocks";

const ApiClient = axios.create({
  baseURL: process.env.REACT_APP_API_KEY_DEV,
});

export const ApiClientQuery = ({ ...options }) => {
  ApiClient.defaults.headers.common.Accept = "application/json";
  ApiClient.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
    "token",
  )}`;
  ApiClient.defaults.headers.post["Content-Type"] = "application/json";

  mocking(ApiClient);

  const onSuccess = (response) => {
    console.log(response.config.url, response);
    return response.data;
  };
  const onError = (error) => {
    // eslint-disable-next-line no-throw-literal
    const { response } = error;
    switch (response?.status) {
      case 401:
        localStorage.removeItem("doctor");
        window.location.replace("/doctor/");
      case 403:
      case 404:
        error.message = response.data?.message;
        break;
      case 422:
        const { data } = response;
        error.message = data?.errors[Object.keys(data.errors)[0]][0];
        break;
      case 500:
        error.message = "요청 처리 중에 오류가 발생했습니다.";
        break;
      default:
        error.message = "알 수 없는 오류가 발생했습니다.";
        break;
    }

    throw error;
  };
  return ApiClient(options).then(onSuccess).catch(onError);
};
