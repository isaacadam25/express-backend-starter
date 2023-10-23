class Utils {
  /**
   *
   * @description Format phone number to 255XXXXXXXXX
   */
  static formatPhoneNumber = (phoneNumber: string): string => {
    const formattedPHoneNumber = "255" + phoneNumber.substring(1);
    return formattedPHoneNumber;
  };

  /**
   *
   * @param value1 - First string value to compare
   * @param value2 - Second string value to compare
   * @returns boolen
   */
  static caseInsensitiveRegex = (value: string): RegExp => {
    return new RegExp("^" + value + "$", "i");
  };
}

export default Utils;
