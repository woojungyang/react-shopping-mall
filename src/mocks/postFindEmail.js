import { faker } from "@faker-js/faker";

export default function postFindEmail(mock) {
  const url = /^\/api\/v1\/users\/find-email$/;
  mock.onPost(url).reply((config) => {
    let status = 200;
    let data = {
      result: faker.helpers.arrayElement([
        { email: faker.internet.email() },
        false,
      ]),
    };

    return [status, data];
  });
}
