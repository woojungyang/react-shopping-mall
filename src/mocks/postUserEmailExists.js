export default function postUserEmailExists(mock) {
  const url = /^\/api\/v1\/users\/email-exists$/;
  mock.onPost(url).reply((config) => {
    let status = 200;
    let data = {
      result: "성공",
    };

    return [status, data];
  });
}
