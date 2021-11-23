import React from 'react';
import {Stack, Text} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {navigationService} from '../../../../services';
import {
  MODAL_DISMISS_COMPONENT,
  PROFILE_MODAL,
} from '../../../../navigation/Screens';
import {useDispatch} from 'react-redux';
import {logout} from '../../../../redux/actions';

const ClassroomScreen = () => {
  const dispatch = useDispatch();
  return (
    <Stack safeArea>
      <TouchableOpacity
        onPress={() => {
          navigationService.showModal(PROFILE_MODAL, {
            topBar: {
              visible: false,
            },
          });
        }}>
        <Text>Show profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          dispatch(logout());
        }}>
        <Text>logout</Text>
      </TouchableOpacity>
    </Stack>
  );
};

export default ClassroomScreen;
