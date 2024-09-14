import { faker } from "@faker-js/faker";
import { ReviewState } from "models/mypage";

export default function getReviews(mock) {
  mock.onGet(/^\/api\/v1\/reviews$/).reply((config) => {
    const status = 200;
    let data = {
      total: collection.length,
      data: collection,
      situation: {
        waiting: collection.filter((e) => e.state == ReviewState.Waiting)
          .length,
        complete: collection.filter((e) => e.state == ReviewState.Complete)
          .length,
      },
    };

    let offset = config.params?.offset || 0;
    let limit = config.params?.limit || 15;
    let state = config.params?.state;

    if (state) data.data = collection.filter((e) => e.state == state);

    data.total = data.data.length;
    data.data = data.data.slice(offset, offset + limit);

    return [status, data];
  });
}

function fakerSubImage() {
  return require(
    `assets/images/sub/sub${faker.number.int({ max: 37, min: 1 })}.jpg`,
  );
}

let collection = new Array(faker.number.int({ max: 50, min: 0 }))
  .fill()
  .map((_, index) => ({
    id: faker.number.int(),
    orderNumber: faker.string.numeric(18),
    state: faker.helpers.arrayElement(Object.values(ReviewState)),
    reviewRate: faker.number.int({ max: 5, min: 1 }),
    writtenAt: faker.date.past(),
    createdAt: faker.date.between({
      from: "2024-01-01T00:00:00.000Z",
      to: "2024-12-31T00:00:00.000Z",
    }),
    order: {
      id: faker.number.int(),
    },
    brand: {
      name: faker.company.name(),
    },
    item: {
      itemName: faker.commerce.productName(),
      thumbnail: fakerSubImage(),
      color: faker.lorem.word(),
      size: faker.lorem.word(),
      quantity: faker.number.int({ max: 5, min: 1 }),
    },
  }));
