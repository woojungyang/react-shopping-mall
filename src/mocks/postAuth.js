import { faker } from "@faker-js/faker";

export default function postAuth(mock) {
  mock.onPost(/^\/api\/v1\/auth\/tokens$/).reply((config) => {
    const status = 200;
    let data = {
      token: faker.datatype.uuid(),
    };

    return [status, data];
  });
}
