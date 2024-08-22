import { faker } from "@faker-js/faker";

export default function patchOrderItemOption(mock) {
  const url = /^\/api\/v1\/orders\/(\d+)\/items\/(\d+)\/options$/;
  mock.onPatch(url).reply((config) => {
    let status = 200;
    let data = {
      result: "성공",
    };

    return [status, data];
  });
}
