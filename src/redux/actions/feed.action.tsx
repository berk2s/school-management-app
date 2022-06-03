import {endFetching} from '.';
import {feedService} from '../../services';
import {
  Announcement,
  AnnouncementChannel,
  Page,
  Pagination,
  SAVE_FEEDS,
  SAVE_PAGINATION,
} from '../types';

export function fetchAnnouncements() {
  return (dispatch: any) => {
    return feedService
      .getAnnouncements(AnnouncementChannel.STUDENTS)
      .then(response => {
        dispatch(savePagination(response.pagination));
        dispatch(storeAnnouncements(response.announcements));
      })
      .catch((err: any) => {});
  };
}

export function savePagination(pagination: Pagination) {
  return {
    type: SAVE_PAGINATION,
    payload: pagination,
  };
}

export function storeAnnouncements(announcements: Announcement[]) {
  return {
    type: SAVE_FEEDS,
    payload: announcements,
  };
}
