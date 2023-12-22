import bcrypt from "bcryptjs";

const saltRounds = 10; //TODO: Make this private or save to .env

class Encryption {
  /**
   * @description An encryption function for password encryption
   *
   * @param {string} value - The value to encrypt
   * @returns {string} - A Promise string indicating encrypted value.
   */
  static encrypt = async (value: string): Promise<string> => {
    const encryptedValue = await bcrypt.hash(value, saltRounds);
    return encryptedValue;
  };

  /**
   * @description An dencryption function for password encryption
   *
   * @param {string} value - The value to encrypt
   * @param {string} hash - The harsh value to dencrypt
   * @returns {string} - A Promise string indicating dencrypted value.
   */
  static decrypt = async (value: string, hash: string): Promise<boolean> => {
    const dencryptedValue = await bcrypt.compare(value, hash);
    return dencryptedValue;
  };
}

export default Encryption;
