import HttpResponse from "@/utils/helpers/HttpResponses";

class Controller extends HttpResponse {
  // default http success response
  protected static successResponse = (
    message: string,
    data: any = null,
    statusCode: number = 200
  ) => {
    return {
      success: true,
      statusCode,
      message,
      data,
    };
  };
}

export default Controller;
