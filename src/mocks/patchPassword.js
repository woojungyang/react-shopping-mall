import { faker } from "@faker-js/faker";

export default function patchPassword(mock) {
  const url = /^\/api\/v1\/users\/password$/;
  mock.onPatch(url).reply((config) => {
    let status = 200;
    let data = {
      result: "성공",
    };

    return [status, data];
  });
}
