import { faker } from "@faker-js/faker";

export default function getLookbooks(mock) {
  const url = /^\/api\/v1\/look-books$/;
  mock.onGet(url).reply((config) => {
    let status = 200;
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

function fakerSubImage() {
  return require(
    `assets/images/sub/sub${faker.number.int({ max: 37, min: 1 })}.jpg`,
  );
}
let collection = new Array(faker.number.int({ max: 100, min: 10 }))
  .fill()
  .map((_, index) => ({
    id: faker.number.int(),
    name: faker.lorem.sentence(),
    thumbnail: fakerSubImage(),
  }));
