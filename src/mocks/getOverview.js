import { faker } from "@faker-js/faker";

export default function getDoctors(mock) {
  mock.onGet(/^\/api\/v1\/overview$/).reply((config) => {
    const status = 200;

    function fakerSubImage() {
      return require(
        `assets/images/sub/sub${faker.datatype.number({ max: 37, min: 1 })}.jpg`,
      );
    }

    function fakerMainImage() {
      return require(
        `assets/images/main/main${faker.datatype.number({ max: 38, min: 1 })}.jpg`,
      );
    }

    function fakerItem() {
      return {
        id: faker.helpers.unique(faker.datatype.number),
        brandName: faker.company.name(),
        thumbnail: fakerSubImage(),
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
        reviewCount: faker.datatype.number({ max: 1000, min: 5 }),
        likeCount: faker.datatype.number({ max: 1000, min: 5 }),
      };
    }

    let data = {
      mainSlide: new Array(faker.datatype.number({ max: 10, min: 5 }))
        .fill()
        .map((_, index) => ({
          id: faker.helpers.unique(faker.datatype.number),
          url: fakerMainImage(),
          title: faker.lorem.sentence(),
          subTitle: faker.lorem.sentence(),
        })),
      bestItems: new Array(faker.datatype.number({ max: 10, min: 5 }))
        .fill()
        .map((_, index) => fakerItem()),
      mdChoice: {
        banners: new Array(faker.datatype.number({ max: 10, min: 5 }))
          .fill()
          .map((_, index) => ({
            id: faker.helpers.unique(faker.datatype.number),
            url: fakerSubImage(),
          })),
        items: new Array(8).fill().map((_, index) => fakerItem()),
      },
      events: new Array(3).fill().map((_, index) => ({
        id: faker.helpers.unique(faker.datatype.number),
        thumbnail: fakerSubImage(),
        title: faker.lorem.sentence(),
        subTitle: faker.lorem.sentence(),
      })),
      clearances: {
        banner: {
          id: faker.helpers.unique(faker.datatype.number),
          url: fakerSubImage(),
        },
        items: new Array(faker.datatype.number({ max: 10, min: 5 }))
          .fill()
          .map((_, index) => fakerItem()),
      },
      recommendedItems: new Array(16).fill().map((_, index) => fakerItem()),
      brands: new Array(4).fill().map((_, index) => ({
        id: faker.helpers.unique(faker.datatype.number),
        brandThumbnail: fakerSubImage(),
        brandName: faker.company.name(),
        copyright: faker.lorem.sentence(),
        items: new Array(2).fill().map((_, index) => fakerItem()),
      })),
      brands: new Array(4).fill().map((_, index) => ({
        id: faker.helpers.unique(faker.datatype.number),
        brandThumbnail: fakerSubImage(),
        brandName: faker.company.name(),
        copyright: faker.lorem.sentence(),
        items: new Array(2).fill().map((_, index) => fakerItem()),
      })),
      brandEvents: new Array(3).fill().map((_, index) => ({
        id: faker.helpers.unique(faker.datatype.number),
        brandThumbnail: fakerSubImage(),
        brandName: faker.company.name(),
        copyright: faker.lorem.sentence(),
        items: new Array(3).fill().map((_, index) => fakerItem()),
      })),
      notices: new Array(faker.datatype.number({ max: 7, min: 5 }))
        .fill()
        .map((_, index) => ({
          id: faker.helpers.unique(faker.datatype.number),
          title: faker.lorem.sentence(),
          writtenAt: faker.date.between(
            "2024-01-01T00:00:00.000Z",
            "2024-07-31T00:00:00.000Z",
          ),
        })),
      userStyles: new Array(6).fill().map((_, index) => ({
        id: faker.helpers.unique(faker.datatype.number),
        username: faker.internet.email(),
        avatar: require(
          `assets/images/user/user${faker.datatype.number({ max: 8, min: 1 })}.jpg`,
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
