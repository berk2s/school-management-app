import {Stack, KeyboardAvoidingView, ChevronLeftIcon} from 'native-base';
import React from 'react';
import {ModalHeader} from '../../../../../components';
import ProfileInformation from '../../ProfileInformation';
import AccountInformationForm from './AccountInformationForm';

const AccountInformationModal = (props: any) => {
  return (
    <Stack flex={1} p={'16px'}>
      <ModalHeader
        modalId={props.componentId}
        dismisAll={true}
        Icon={<ChevronLeftIcon size={'22px'} />}
      />

      <Stack my={'30px'}>
        <ProfileInformation
          mainText={'Hesap bilgileri'}
          subText={'Adınız & soyadınız ve diğer kişisel bilgiler'}
        />
      </Stack>
      <KeyboardAvoidingView
        h={{
          base: '500px',

          lg: 'auto',
        }}
        behavior={'position'}>
        <AccountInformationForm />
      </KeyboardAvoidingView>
    </Stack>
  );
};

export default AccountInformationModal;
