import { faker } from "@faker-js/faker";

export default function getReview(mock) {
  mock.onGet(/^\/api\/v1\/review\/(\d+)$/).reply((config) => {
    const status = 200;
    let data = collection;

    return [status, data];
  });
}
function fakerSubImage() {
  return require(
    `assets/images/sub/sub${faker.number.int({ max: 37, min: 1 })}.jpg`,
  );
}

let collection = {
  id: faker.number.int(),
  orderNumber: faker.string.numeric(18),
  thumbnail: fakerSubImage(),
  reviewRate: faker.number.int({ max: 5, min: 1 }),
  writtenAt: faker.date.past(),
  content: {
    text: faker.lorem.paragraph(),
    photo: new Array(faker.number.int({ max: 5, min: 0 }))
      .fill()
      .map((_, index) => ({
        thumbnail: fakerSubImage(),
      })),
  },
  item: {
    color: faker.lorem.word(),
    size: faker.lorem.word(),
  },
};
