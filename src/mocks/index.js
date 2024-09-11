import Axios from "axios";
import MockAdapter from "axios-mock-adapter";

export default function mocking(axios) {
  const mock = new MockAdapter(axios, { delayResponse: 1000 });
  [
    require("./deleteCartItem").default,
    require("./deleteLike").default,
    require("./getCategoryOverview").default,
    require("./getEvents").default,
    require("./getItem").default,
    require("./getItemQuestions").default,
    require("./getItemReviews").default,
    require("./getItems").default,
    require("./getKeywords").default,
    require("./getLIkes").default,
    require("./getLookbooks").default,
    require("./getNotice").default,
    require("./getNotices").default,
    require("./getOrder").default,
    require("./getOrders").default,
    require("./getOverview").default,
    require("./getUser").default,
    require("./patchCartItem").default,
    require("./patchOrderItemOption").default,
    require("./patchPassword").default,
    require("./postAuth").default,
    require("./postCartItems").default,
    require("./postFindEmail").default,
    require("./postUser").default,
    require("./postUserEmailExists").default,
  ].forEach((mocking) => mocking(mock));
  mock.onAny().reply(Axios.request);
  return mock;
}
