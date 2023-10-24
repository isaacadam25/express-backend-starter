import axios from "axios";
import btoa from "btoa";
import https from "https";

const env = process.env;

class SmsService {
  /**
   *
   * @description Send sms thrid party service
   *
   */
  static sendSms = async (message: string, phoneNumber: string) => {
    const payload = {
      source_addr: env.SENDER_ID,
      schedule_time: "",
      encoding: 0,
      message: message,
      recipients: [
        {
          recipient_id: 1,
          dest_addr: phoneNumber,
        },
      ],
    };

    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " + btoa(env.SMS_API_KEY + ":" + env.SMS_SECRET_KEY),
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    };
    try {
      const response = await axios.post(env.SEND_SMS_URI, payload, headers);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
}

export default SmsService;
