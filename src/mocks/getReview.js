import { faker } from "@faker-js/faker";

export default function getReview(mock) {
  mock.onGet(/^\/api\/v1\/review\/(\d+)$/).reply((config) => {
    const urlSegments = config.url.split("/");
    const itemId = urlSegments[urlSegments.length - 1];
    console.log(itemId);

    const status = 200;
    let data = {
      id: itemId,
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
  orderNumber: faker.string.numeric(18),
  reviewRate: faker.number.int({ max: 5, min: 1 }),
  writtenAt: faker.date.past(),
  content: {
    text: faker.lorem.paragraphs(),
    photo: new Array(faker.number.int({ max: 5, min: 0 }))
      .fill()
      .map((_, index) => ({
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
