import { faker } from "@faker-js/faker";

export default function getCategoryOverview(mock) {
  mock.onGet(/^\/api\/v1\/category-overview$/).reply((config) => {
    const status = 200;

    function fakerSubImage() {
      return require(
        `assets/images/sub/sub${faker.number.int({ max: 37, min: 1 })}.jpg`,
      );
    }

    function fakerMainImage() {
      return require(
        `assets/images/main/main${faker.number.int({ max: 38, min: 1 })}.jpg`,
      );
    }

    function fakerItem() {
      return {
        id: faker.number.int(),
        brandName: faker.company.name(),
        thumbnail: fakerSubImage(),
        itemName: faker.commerce.productName(),
        originalPrice: faker.commerce.price({
          min: 9100,
          max: 10000,
          dec: 0,
        }),
        price: faker.commerce.price({
          min: 100,
          max: 9000,
          dec: 0,
        }),
        like: localStorage.getItem("tokens")
          ? faker.helpers.arrayElement([true, false])
          : false,
        reviewCount: faker.number.int({ max: 1000, min: 5 }),
        likeCount: faker.number.int({ max: 1000, min: 5 }),
      };
    }

    let data = {
      mainSlide: new Array(faker.number.int({ max: 18, min: 6 }))
        .fill()
        .map((_, index) => ({
          id: faker.number.int(),
          url: fakerMainImage(),
          title: faker.lorem.sentence(),
          subTitle: faker.lorem.sentence(),
        })),
      events: new Array(faker.number.int({ max: 10, min: 4 }))
        .fill()
        .map((_, index) => ({
          id: faker.number.int(),
          thumbnail: fakerSubImage(),
          title: faker.lorem.sentence(),
          subTitle: faker.lorem.sentence(),
          keyword: faker.lorem.word(),
        })),
      bestItems: new Array(7).fill().map((_, index) => fakerItem()),
      mdChoice: new Array(faker.number.int({ max: 10, min: 6 }))
        .fill()
        .map((_, index) => fakerItem()),
      recommendedItems: new Array(10).fill().map((_, index) => fakerItem()),
    };

    return [status, data];
  });
}
