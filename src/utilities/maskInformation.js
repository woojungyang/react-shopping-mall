export function maskAccountName(accountName = "") {
  return accountName.replace(/^(.{3}).*@.*/, "$1****");
}

export function maskPhoneNumber(phoneNumber) {
  return phoneNumber.replace(/(\d{3})[- ]?(\d{3,4})[- ]?(\d{4})/, "$1-****-$3");
}

export function maskName(name) {
  if (name.length <= 2) return name.charAt(0) + "*".repeat(name.length - 1);

  const firstChar = name.charAt(0);
  const lastChar = name.charAt(name.length - 1);
  const maskedMiddle = "*".repeat(name.length - 2);

  return firstChar + maskedMiddle + lastChar;
}
