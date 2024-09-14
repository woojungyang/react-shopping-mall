import { faker } from "@faker-js/faker";

export default function getReviews(mock) {
  mock.onGet(/^\/api\/v1\/reviews$/).reply((config) => {
    const status = 200;
    let data = {
      total: collection.length,
      data: collection,
      averageRate: faker.number.int({ max: 5, min: 1 }),
    };

    let offset = config.params?.offset || 0;
    let limit = config.params?.limit || 15;

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

let collection = new Array(faker.number.int({ max: 20, min: 0 }))
  .fill()
  .map((_, index) => ({
    id: faker.number.int(),
    orderNumber: faker.string.numeric(18),
    thumbnail: fakerSubImage(),
    reviewRate: faker.number.int({ max: 5, min: 1 }),
    writtenAt: faker.date.past(),
    content: faker.lorem.paragraph(),
    item: {
      color: faker.lorem.word(),
      size: faker.lorem.word(),
    },
  }));
