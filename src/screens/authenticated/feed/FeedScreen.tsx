import React, {useEffect} from 'react';

import {Stack, VStack, FlatList} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAnnouncements, logout} from '../../../redux/actions';
import {RootState} from '../../../redux/reducers';
import {Announcement} from '../../../redux/types';
import {Card} from '../../../components';
import {Alert} from 'react-native';
import {navigationService} from '../../../services';
import {FEED_DETAILS_SCREEN} from '../../../navigation/Screens';

const FeedScreen = (props: any) => {
  const {imageUrl} = useSelector((state: RootState) => state.metadata);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, []);

  const renderAnnouncements = ({item}: {item: Announcement}) => {
    const imageUri =
      typeof item.announcementImages !== 'undefined'
        ? item.announcementImages.length > 0
          ? imageUrl + '/' + item.announcementImages[0].imageUrl
          : null
        : null;
    return (
      <Card
        cardProps={{
          bannerUri: imageUri,
          cardTitle: item.announcementTitle,
          cardDesc: item.announcementDescription,
          createdAt: item.createdAt,
        }}
        onPress={() => {
          navigationService.navigate(
            props.componentId,
            FEED_DETAILS_SCREEN,
            {
              announcement: item,
            },
            {
              topBar: {
                title: {
                  text: 'Duyuru',
                },
                backButton: {
                  visible: true,
                },
              },
            },
          );
        }}
        isCropped={true}
      />
    );
  };

  return (
    <Stack flex={1} alignContent="center">
      <VStack flex={1} px={15}>
        <FlatList
          data={useSelector((state: RootState) => state.feed.announcements)}
          renderItem={renderAnnouncements}
          keyExtractor={item => item.announcementId}
          py={15}
          initialNumToRender={10}
        />
      </VStack>
    </Stack>
  );
};

export default FeedScreen;
