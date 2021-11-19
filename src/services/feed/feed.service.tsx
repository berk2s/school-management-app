import {apiService} from '..';
import {Announcement, AnnouncementChannel, Pagination} from '../../redux/types';
import {ANNOUNCEMENT_URL} from '@env';
import {getEnumKeyByEnumValue} from '../../utils/enum-helper';
import {store} from '../../redux';
import {Page, SortDirection} from '../../redux/types';

export const feedService = {
  getAnnouncements,
};

async function getAnnouncements(
  announcementChannel: AnnouncementChannel,
  page: number = 0,
  size: number = 10,
  sort: string = 'createdAt',
  order: SortDirection = 'desc',
  search: string = '',
): Promise<{
  announcements: Announcement[];
  pagination: Pagination;
}> {
  const _announcementChannel = getEnumKeyByEnumValue(
    AnnouncementChannel,
    announcementChannel,
  );

  const {organizationId} = store.getState().organization;

  const announcements: Page<Announcement> = await apiService.get(
    `${ANNOUNCEMENT_URL}/organization/${organizationId}`,
    {
      page: page,
      size: size,
      sort: sort,
      order: order,
      search: search,
      announcementChannel: _announcementChannel,
    },
  );

  const pagination = {
    length: announcements.totalElements,
    size: size,
    page: announcements.number,
    sortedBy: sort,
    order: order,
  };

  return {
    announcements: announcements.content,
    pagination: pagination,
  };
}
