import {CloseIcon, IconButton, Text, useColorModeValue} from 'native-base';
import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {navigationService} from '../services';

const ModalDismiss = (props: any) => {
  return (
    <TouchableOpacity
      style={{
        width: 50,
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
      onPress={() => {
        navigationService.dismissModal(props.modalId);
      }}>
      <IconButton
        icon={<CloseIcon size={'16px'} />}
        size={'16px'}
        alignItems={'flex-start'}
        justifyContent={'center'}
        _icon={{
          color: useColorModeValue('accent.800', 'accent.100'),
        }}
        _pressed={{
          bg: 'transparent',
        }}
        onPress={() => {
          navigationService.dismissModal(props.modalId);
        }}
      />
    </TouchableOpacity>
  );
};

export default ModalDismiss;
