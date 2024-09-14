export default function postReview(mock) {
  const url = /^\/api\/v1\/review$/;
  mock.onPost(url).reply((config) => {
    let status = 200;
    let data = {
      result: "성공",
    };

    return [status, data];
  });
}
