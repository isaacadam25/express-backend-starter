class SmsService {
  /**
   *
   * @description Send sms thrid party service
   *
   */
  static sendSms = async (message: string, phoneNumber: string) => {
    console.log("Sending sms complete", message, phoneNumber);
  };
}

export default SmsService;
