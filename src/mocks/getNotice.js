import { faker } from "@faker-js/faker";

export default function getNotice(mock) {
  mock.onGet(/^\/api\/v1\/notice\/(\d+)$/).reply((config) => {
    const status = 200;
    let data = collection;

    return [status, data];
  });
}

let collection = {
  id: faker.number.int(),
  writtenAt: faker.date.past(),
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraph(),
};
