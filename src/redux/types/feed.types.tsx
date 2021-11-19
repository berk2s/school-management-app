import {Pagination} from '.';

export const SAVE_FEEDS = 'SAVE_FEEDS';
export const SAVE_PAGINATION = 'SAVE_PAGINATION';

export interface FeedState {
  announcements: Announcement[];
  pagination: Pagination;
}

export enum AnnouncementChannel {
  STUDENTS = 'Öğrenciler',
  TEACHERS = 'Öğretmenler',
  PARENTS = 'Veliler',
}

export interface Announcement {
  announcementId: number;
  announcementImages?: AnnouncementImages[];
  announcementTitle: string;
  announcementDescription?: string;
  announcementChannels: AnnouncementChannel[];
  announcementStatus: boolean;
  createdAt: Date;
  lastModifiedAt: Date;
}

export interface AnnouncementImages {
  imageUrl: string;
  imageSize: number;
}
