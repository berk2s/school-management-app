import {HStack, IconButton, useColorModeValue, Button, Text} from 'native-base';
import React from 'react';
import {navigationService} from '../services';

interface ModalProps {
  title?: string;
  dismisAll?: boolean;
  modalId: string;
  Icon: any;
}

const ModalHeader = (props: ModalProps) => {
  const {modalId, dismisAll, Icon, title} = props;
  return (
    <HStack
      h={'40px'}
      mt={3}
      justifyContent={title ? 'flex-start' : 'space-between'}
      alignItems={'center'}>
      <IconButton
        icon={Icon}
        size={'36px'}
        justifyContent={'center'}
        alignItems={'center'}
        borderRadius={'10px'}
        background={useColorModeValue('accent.50', 'accent.800')}
        _icon={{
          color: useColorModeValue('accent.400', 'accent.100'),
        }}
        _pressed={{
          bg: 'transparent',
        }}
        onPress={() => navigationService.dismissModal(modalId)}
      />

      {title && (
        <Text w={'80%'} textAlign={'center'} fontWeight={700} fontSize={16}>
          {title}
        </Text>
      )}

      {dismisAll && (
        <Button
          h={'36px'}
          minW={'84px'}
          borderRadius={'10px'}
          _text={{
            fontWeight: 700,
            color: useColorModeValue('accent.400', 'accent.100'),
          }}
          background={useColorModeValue('accent.50', 'accent.800')}
          onPress={() => {
            navigationService.dismissAllModals();
          }}
          variant="unstyled">
          Kapat
        </Button>
      )}
    </HStack>
  );
};

export default ModalHeader;
