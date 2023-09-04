class HttpResponse {
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

  protected static errorResponse = (
    message: string,
    data: any = null,
    statusCode: number = 400
  ) => {
    return {
      success: false,
      statusCode,
      message,
      data,
    };
  };
}

export default HttpResponse;
