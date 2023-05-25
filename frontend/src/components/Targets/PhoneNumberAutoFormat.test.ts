import { phoneNumberAutoFormat } from "./PhoneNumberAutoFormat";

describe("PhoneNumberAutoFormat", () => {
  it("should format long phone number", () => {
    const phoneNumber = "12345678900000";
    phoneNumberAutoFormat(phoneNumber);
  });
  it("should format phone number: length 9", () => {
    const phoneNumber = "123456789";
    phoneNumberAutoFormat(phoneNumber);
  });

  it("should format phone number: length 6", () => {
    const phoneNumber = "123456";
    phoneNumberAutoFormat(phoneNumber);
  });

  it("should format phone number: length 3", () => {
    const phoneNumber = "123";
    phoneNumberAutoFormat(phoneNumber);
  });
});
