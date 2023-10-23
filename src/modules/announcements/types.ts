/**
 *
 * @description Announcement details payload
 *
 */
export interface IAnnouncementPayload {
  title: string;
  message: string;
  receivers: string[];
}

/**
 *
 * @description Announcement details body
 *
 */
export interface IAnnouncementBody extends IAnnouncementPayload {}
