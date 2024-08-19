export default function postUser(mock) {
  const url = /^\/api\/v1\/users$/;
  mock.onPost(url).reply((config) => {
    let status = 200;
    let data = {
      result: "성공",
    };

    return [status, data];
  });
}
