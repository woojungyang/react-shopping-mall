export function maskAccountName(accountName = "") {
  return accountName.replace(
    /^(.{3})(.*)$/,
    (match, p1, p2) => p1 + "*".repeat(p2.length),
  );
}

export function maskPhoneNumber(phoneNumber) {
  return phoneNumber.replace(/(\d{3})[- ]?(\d{3,4})[- ]?(\d{4})/, "$1-****-$3");
}
