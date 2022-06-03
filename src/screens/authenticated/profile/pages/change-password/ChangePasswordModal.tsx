import {ChevronLeftIcon, KeyboardAvoidingView, Stack} from 'native-base';
import React from 'react';
import {ModalHeader} from '../../../../../components';
import ProfileInformation from '../../ProfileInformation';
import ChangePasswordForm from './ChangePasswordForm';

const ChangePasswordModal = (props: any) => {
  return (
    <Stack flex={1} p={'16px'}>
      <ModalHeader
        modalId={props.componentId}
        dismisAll={true}
        Icon={<ChevronLeftIcon size={'22px'} />}
      />

      <Stack my={'30px'}>
        <ProfileInformation
          mainText={'Şifre değiştir'}
          subText={'Yeni şifre oluştur'}
        />
      </Stack>

      <KeyboardAvoidingView
        h={{
          base: '500px',
          lg: 'auto',
        }}
        behavior={'position'}>
        <ChangePasswordForm />
      </KeyboardAvoidingView>
    </Stack>
  );
};

export default ChangePasswordModal;
