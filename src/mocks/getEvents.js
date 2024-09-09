import { faker } from "@faker-js/faker";
import { EventType } from "models/event";

export default function getEvents(mock) {
  const url = /^\/api\/v1\/events$/;
  mock.onGet(url).reply((config) => {
    let status = 200;
    let data = {
      total: collection.length,
      data: collection,
    };

    let offset = config.params?.offset || 0;
    let limit = config.params?.limit || 15;

    let type = config.params.type || "";

    if (type > 0) data.data = data.data.filter((e) => e.type == type);

    data.total = data.data.length;
    data.data = data.data.slice(offset, offset + limit);

    return [status, data];
  });
}

function fakerSubImage() {
  return require(
    `assets/images/main/main${faker.number.int({ max: 38, min: 1 })}.jpg`,
  );
}
let collection = new Array(faker.number.int({ max: 100, min: 10 }))
  .fill()
  .map((_, index) => ({
    id: faker.number.int(),
    type: faker.helpers.arrayElement(Object.values(EventType)),
    title: faker.lorem.sentence(),
    thumbnail: fakerSubImage(),

    startedAt: faker.date.between({
      from: "2024-01-01T00:00:00.000Z",
      to: "2024-03-31T00:00:00.000Z",
    }),
    endedAt: faker.date.between({
      from: "2024-04-01T00:00:00.000Z",
      to: "2024-09-31T00:00:00.000Z",
    }),
  }));
