import { faker } from "@faker-js/faker";

export default function getKeywords(mock) {
  mock.onGet(/^\/api\/v1\/keywords$/).reply((config) => {
    const status = 200;

    let data = {
      hotKeywords: new Array(faker.number.int({ max: 7, min: 5 }))
        .fill()
        .map((_, index) => ({
          id: faker.number.int(),
          keyword: faker.lorem.word(),
        })),
      recommendKeywords: new Array(faker.number.int({ max: 7, min: 5 }))
        .fill()
        .map((_, index) => ({
          id: faker.number.int(),
          keyword: faker.lorem.word(),
        })),
    };

    return [status, data];
  });
}
