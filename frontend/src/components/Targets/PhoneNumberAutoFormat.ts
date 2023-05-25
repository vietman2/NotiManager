export const phoneNumberAutoFormat = (phoneNumber: string): string => {
  let number = phoneNumber.replace(/[^0-9]/g, "");

  if (number.length < 4) return number;
  if (number.length < 7) return `${number.slice(0, 3)}-${number.slice(3)}`;
  if (number.length < 10)
    return `${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(6, 10)}`;
  return `${number.slice(0, 3)}-${number.slice(3, 7)}-${number.slice(7, 11)}`;
};
