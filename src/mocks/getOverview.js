import { faker } from "@faker-js/faker";

export default function getOverview(mock) {
  mock.onGet(/^\/api\/v1\/overview$/).reply((config) => {
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
      mobileCategory: new Array(8).fill().map((_, index) => ({
        id: faker.number.int(),
        name: faker.lorem.word(),
      })),
      mainSlide: new Array(faker.number.int({ max: 10, min: 5 }))
        .fill()
        .map((_, index) => ({
          id: faker.number.int(),
          url: fakerMainImage(),
          title: faker.lorem.sentence(),
          subTitle: faker.lorem.sentence(),
        })),
      bestItems: new Array(faker.number.int({ max: 10, min: 5 }))
        .fill()
        .map((_, index) => fakerItem()),
      mdChoice: {
        banners: new Array(faker.number.int({ max: 10, min: 5 }))
          .fill()
          .map((_, index) => ({
            id: faker.number.int(),
            url: fakerSubImage(),
          })),
        items: new Array(8).fill().map((_, index) => fakerItem()),
      },
      events: new Array(3).fill().map((_, index) => ({
        id: faker.number.int(),
        thumbnail: fakerSubImage(),
        title: faker.lorem.sentence(),
        subTitle: faker.lorem.sentence(),
      })),
      clearances: {
        banner: {
          id: faker.number.int(),
          url: fakerSubImage(),
        },
        items: new Array(faker.number.int({ max: 10, min: 5 }))
          .fill()
          .map((_, index) => fakerItem()),
      },
      recommendedItems: new Array(16).fill().map((_, index) => fakerItem()),
      brands: new Array(4).fill().map((_, index) => ({
        id: faker.number.int(),
        brandThumbnail: fakerSubImage(),
        brandName: faker.company.name(),
        copyright: faker.lorem.sentence(),
        items: new Array(2).fill().map((_, index) => fakerItem()),
      })),

      brandEvents: new Array(3).fill().map((_, index) => ({
        id: faker.number.int(),
        brandThumbnail: fakerSubImage(),
        brandName: faker.company.name(),
        copyright: faker.lorem.sentence(),
        items: new Array(3).fill().map((_, index) => fakerItem()),
      })),
      notices: new Array(faker.number.int({ max: 7, min: 5 }))
        .fill()
        .map((_, index) => ({
          id: faker.number.int(),
          title: faker.lorem.sentence(),
          writtenAt: faker.date.between({
            from: "2024-01-01T00:00:00.000Z",
            to: "2024-07-31T00:00:00.000Z",
          }),
        })),
      userStyles: new Array(6).fill().map((_, index) => ({
        id: faker.number.int(),
        username: faker.internet.email(),
        avatar: require(
          `assets/images/user/user${faker.number.int({ max: 8, min: 1 })}.jpg`,
        ),
      })),
      search: {
        hotKeywords: new Array(faker.number.int({ max: 7, min: 5 }))
          .fill()
          .map((_, index) => ({
            id: faker.number.int(),
            keywords: faker.lorem.word(),
          })),
        recommendKeywords: new Array(faker.number.int({ max: 7, min: 5 }))
          .fill()
          .map((_, index) => ({
            id: faker.number.int(),
            keywords: faker.lorem.word(),
          })),
      },
    };

    return [status, data];
  });
}
