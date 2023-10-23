/**
 *
 * @description Volunteer registration details payload
 *
 */
export interface IVolunteerPayload {
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  email?: string;
}

/**
 *
 * @description Volunteer registration details body
 *
 */
export interface IVolunteerBody {
  first_name: string;
  last_name: string;
  gender: string;
  phone_number: string;
  email?: string;
}

/**
 *
 * @description Volunteer response
 *
 */
export interface IVolunteerReponse {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNUmber: string;
  email?: string;
  status: boolean;
}
