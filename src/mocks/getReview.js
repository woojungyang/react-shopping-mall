import { faker } from "@faker-js/faker";

export default function getReview(mock) {
  mock.onGet(/^\/api\/v1\/review\/(\d+)$/).reply((config) => {
    const urlSegments = config.url.split("/");
    const itemId = urlSegments[urlSegments.length - 1];

    const status = 200;
    let data = {
      // id: itemId,
      ...collection,
    };

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
  reviewRate: faker.number.int({ max: 5, min: 1 }),
  writtenAt: faker.date.past(),
  content: {
    text: faker.lorem.paragraphs(),
    photos: new Array(faker.number.int({ max: 5, min: 0 }))
      .fill()
      .map((_, index) => ({
        id: faker.number.int(),
        thumbnail: fakerSubImage(),
      })),
  },
  item: {
    thumbnail: fakerSubImage(),
    color: faker.lorem.word(),
    size: faker.lorem.word(),
    quantity: faker.number.int({ max: 5, min: 1 }),
  },
};
