import { faker } from "@faker-js/faker";
import { MembershipRank } from "models/user";

export default function getUser(mock) {
  const url = /^\/api\/v1\/user$/;
  mock.onGet(url).reply((config) => {
    let status = 200;
    let data = {
      id: faker.number.int(),
      name: faker.person.fullName(),
      rank: faker.helpers.arrayElement(Object.values(MembershipRank)),
      couponCount: faker.number.int({ max: 10, min: 0 }),
      mileage: faker.number.int({ max: 1000, min: 100 }),
    };

    return [status, data];
  });
}
