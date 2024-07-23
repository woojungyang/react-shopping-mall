export function checkEmail(email = "") {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function checkPassword(password = "") {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  return passwordRegex.test(password);
}

export function checkPhoneNumber(phoneNumber = "") {
  const phoneRegex = /^01[016789]\d{7,8}$/;
  return phoneRegex.test(phoneNumber);
}
