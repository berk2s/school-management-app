import {Stack, View, FlatList, CloseIcon} from 'native-base';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ModalHeader} from '../../../components';
import {
  ACCOUNT_INFORMATION_MODAL,
  CHANGE_PASSWORD_MODAL,
} from '../../../navigation/Screens';
import {logout} from '../../../redux/actions';
import {RootState} from '../../../redux/reducers';
import {UserInfo} from '../../../redux/types';
import {navigationService} from '../../../services';
import ProfileModalItem from './ProfileModalItem';

export interface MenuItem {
  id: number;
  icon: string;
  text: string;
  screen: string;
  notificationBadge?: boolean;
}

const menuData: MenuItem[] = [
  {
    id: 0,
    icon: 'person-circle',
    text: 'Hesap bilgilerim',
    screen: ACCOUNT_INFORMATION_MODAL,
  },
  {
    id: 1,
    icon: 'notifications',
    text: 'Bildirimler',
    screen: '',
    notificationBadge: true,
  },
  {
    id: 2,
    icon: 'lock-closed',
    text: 'Şifre değiştir',
    screen: CHANGE_PASSWORD_MODAL,
  },
  {
    id: 3,
    icon: 'exit',
    text: 'Çıkış',
    screen: 'EXIT',
  },
];

const ProfileModal = (props: any) => {
  const dispatch = useDispatch();

  const userInfo: UserInfo = useSelector(
    (state: RootState) => state.auth.userInfo,
  );

  const renderItem = (_item: any) => {
    const {item}: {item: MenuItem} = _item;
    return (
      <ProfileModalItem
        onPress={() => {
          if (item.screen === 'EXIT') {
            dispatch(logout());
          } else {
            navigationService.showModal(item.screen, {
              topBar: {
                visible: false,
              },
            });
          }
        }}
        item={_item}
      />
    );
  };

  return (
    <Stack p={'16px'}>
      <ModalHeader
        modalId={props.componentId}
        Icon={<CloseIcon size={'11px'} />}
        dismisAll={false}
        title={`${userInfo.firstName} ${userInfo.lastName}`}
      />

      <FlatList
        contentContainerStyle={{paddingTop: 25}}
        data={menuData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </Stack>
  );
};

export default ProfileModal;
