import { faker } from "@faker-js/faker";

export default function getNotices(mock) {
  mock.onGet(/^\/api\/v1\/notices$/).reply((config) => {
    const status = 200;
    let data = {
      total: collection.length,
      data: collection,
    };

    let offset = config.params?.offset || 0;
    let limit = config.params?.limit || 15;

    data.total = data.data.length;
    data.data = data.data.slice(offset, offset + limit);

    return [status, data];
  });
}

let collection = new Array(faker.number.int({ max: 20, min: 0 }))
  .fill()
  .map((_, index) => ({
    id: faker.number.int(),
    writtenAt: faker.date.past(),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
  }));
