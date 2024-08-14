import Axios from "axios";
import MockAdapter from "axios-mock-adapter";

export default function mocking(axios) {
  const mock = new MockAdapter(axios, { delayResponse: 1000 });
  [
    require("./getItem").default,
    require("./getItemQuestions").default,
    require("./getItemReviews").default,
    require("./getOverview").default,
    require("./postAuth").default,
    require("./postCartItem").default,
  ].forEach((mocking) => mocking(mock));
  mock.onAny().reply(Axios.request);
  return mock;
}
