import { faker } from "@faker-js/faker";
import { QuestionState } from "models/notice";

export default function getItem(mock) {
  const url = /^\/api\/v1\/item\/(\d+)$/;
  mock.onGet(url).reply((config) => {
    let status = 200;
    let data = collection;

    return [status, data];
  });

  function fakerSubImage() {
    return require(
      `assets/images/sub/sub${faker.number.int({ max: 37, min: 1 })}.jpg`,
    );
  }

  let collection = {
    id: faker.helpers.unique(faker.number.int),
    brandName: faker.company.name(),
    itemCode: faker.string.uuid(),
    thumbnail: new Array(faker.number.int({ max: 5, min: 1 }))
      .fill()
      .map((_, index) => ({
        id: faker.helpers.unique(faker.number.int),
        thumbnail: fakerSubImage(),
      })),
    recommendedItems: new Array(8).fill().map((_, index) => ({
      id: faker.helpers.unique(faker.number.int),
      thumbnail: fakerSubImage(),
    })),
    itemName: faker.commerce.productName(),
    originalPrice: faker.commerce.price({
      min: 500000,
      max: 900000,
      dec: 0,
    }),
    price: faker.commerce.price({
      min: 1000,
      max: 499999,
      dec: 0,
    }),
    like: localStorage.getItem("tokens")
      ? faker.helpers.arrayElement([true, false])
      : false,
    likeCount: faker.number.int({ max: 1000, min: 5 }),
    description: faker.lorem.paragraph(),
    scheduledToArriveDate: faker.date.soon({ days: 10 }),
    reviewRate: faker.number.int({ max: 5, min: 1 }),
    colors: new Array(faker.number.int({ max: 10, min: 5 }))
      .fill()
      .map((_, index) => ({
        id: faker.helpers.unique(faker.number.int),
        thumbnail: fakerSubImage(),
        name: faker.lorem.word(),
      })),
    sizes: new Array(faker.number.int({ max: 10, min: 0 }))
      .fill()
      .map((_, index) => ({
        id: faker.helpers.unique(faker.number.int),
        inventory: faker.number.int({ max: 10, min: 0 }),
        size: faker.lorem.word(),
      })),
    /*  reviews: {
      data: new Array(faker.number.int({ max: 20, min: 0 }))
        .fill()
        .map((_, index) => ({
          id: faker.helpers.unique(faker.number.int),
          thumbnail: fakerSubImage(),
          reviewRate: faker.number.int({ max: 5, min: 1 }),
          user: {
            username: faker.internet.email(),
          },
          writtenAt: faker.date.past(),
          content: faker.lorem.paragraph(),
          item: {
            color: faker.lorem.word(),
            size: faker.lorem.word(),
          },
        })),
    },
    questions: {
      data: new Array(faker.number.int({ max: 20, min: 0 }))
        .fill()
        .map((_, index) => ({
          id: faker.helpers.unique(faker.number.int),
          user: {
            username: faker.internet.email(),
          },
          writtenAt: faker.date.past(),
          content: faker.lorem.paragraph(),
          state: faker.helpers.arrayElement([
            QuestionState.Pending,
            QuestionState.Complete,
          ]),
        })),
    }, */
  };
}
