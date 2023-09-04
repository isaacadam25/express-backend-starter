import bcrypt from "bcryptjs";

const saltRounds = 10;

class Encryption {
  // -> hash function
  static encrypt = async (value: string): Promise<string> => {
    const encryptedValue = await bcrypt.hash(value, saltRounds);
    return encryptedValue;
  };

  // -> decrypt value
  static decrypt = async (value: string, hash: string): Promise<boolean> => {
    const dencryptedValue = await bcrypt.compare(value, hash);
    return dencryptedValue;
  };
}

export default Encryption;
