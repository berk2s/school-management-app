import React, {useEffect, useState} from 'react';
import {ScrollView, Stack, VStack} from 'native-base';
import {Announcement} from '../../../../../redux/types';
import {Card} from '../../../../../components';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../../redux/reducers';

const FeedDetailsScreen = (props: any) => {
  const {imageUrl} = useSelector((state: RootState) => state.metadata);

  const [announcement, setAnnouncement] = useState<Announcement>();
  useEffect(() => {
    setAnnouncement(props.announcement);
  }, []);
  return (
    <Stack flex={1}>
      <VStack flex={1}>
        <Stack flex={1}>
          <ScrollView p={15}>
            <Card
              cardProps={{
                images: announcement?.announcementImages?.map(
                  i => imageUrl + '/' + i.imageUrl,
                ),
                cardTitle: announcement?.announcementTitle,
                cardDesc: announcement?.announcementDescription,
                createdAt: announcement?.createdAt,
              }}
              isCropped={false}
            />
          </ScrollView>
        </Stack>
      </VStack>
    </Stack>
  );
};

export default FeedDetailsScreen;
