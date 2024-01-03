/**
 *
 * @description Sanitized permission
 *
 */
export interface ISanitizedPermission {
  id: string;
  genericName: string;
  displayName: string;
}

/**
 *
 * @description User registration details payload
 *
 */
export interface IUserPayload {
  id?: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  email?: string;
  last_login?: string;
  password?: string;
  role: string;
}

/**
 *
 * @description Formatted user registration details payload
 *
 */
export interface IUserBody {
  first_name: string;
  last_name: string;
  gender: string;
  phone_number: string;
  email?: string;
  password: string;
  role: string;
}

/**
 *
 * @description Sanitized user response
 *
 */

export interface ISanitizedUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  email: string | null;
  last_login: string | null;
  role: string;
  permissions: ISanitizedPermission[];
}
