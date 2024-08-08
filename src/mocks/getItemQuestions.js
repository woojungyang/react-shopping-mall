import { faker } from "@faker-js/faker";
import { QuestionState } from "models/notice";

export default function getItemQuestions(mock) {
  mock.onGet(/^\/api\/v1\/item\/(\d+)\/questions$/).reply((config) => {
    const status = 200;
    let data = { total: collection.length, data: collection };

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
  }));
