import { faker } from "@faker-js/faker";

export default function getDoctors(mock) {
  mock.onGet(/^\/api\/v1\/overview$/).reply((config) => {
    const status = 200;
    let data = {
      mainSlide: new Array(faker.datatype.number({ max: 10, min: 5 }))
        .fill()
        .map((_, index) => ({
          id: faker.helpers.unique(faker.datatype.number),
          url: require(
            `assets/images/main/main${faker.datatype.number({ max: 22, min: 1 })}.jpg`,
          ),
        })),
      // mainSlider: [
      //   { id: 1, url: faker.image.urlLoremFlickr({ category: "fashion" }) },
      // ],
      // id: faker.helpers.unique(faker.datatype.number),
      // name: faker.name.fullName(),
      // phoneNumber: faker.phone.number(),
      // user: {
      //   id: faker.helpers.unique(faker.datatype.number),
      //   username: faker.internet.email(),
      // },
    };

    return [status, data];
  });
}
