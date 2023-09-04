class Utils {
  // format phone number to 255XXXXXXX
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
