class HttpResponse {
  /**
   * @description A custom HTTP success response
   *
   * @param {string} message - The response message.
   * @param {string} data - The response data to be returned.
   * @param {string} statusCode - The response status code to be returned.
   * @returns {object} - An object indicating HTTP success response.
   */
  protected static successResponse = (
    message: string,
    data: any = null,
    statusCode: number = 200
  ): object => {
    return {
      success: true,
      statusCode,
      message,
      data,
    };
  };

  /**
   * @description A custom HTTP error response
   *
   * @param {string} message - The response message.
   * @param {string} data - The response data to be returned.
   * @param {string} statusCode - The response status code to be returned.
   * @returns {object} - An object indicating HTTP error response.
   */
  protected static errorResponse = (
    message: string,
    data: any = null,
    statusCode: number = 400
  ): object => {
    return {
      success: false,
      statusCode,
      message,
      data,
    };
  };
}

export default HttpResponse;
