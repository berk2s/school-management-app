import React from 'react';
import {
  ChevronLeftIcon,
  HStack,
  IconButton,
  useColorModeValue,
} from 'native-base';

import {BrandBox} from '.';
import {navigationService} from '../services';

const HeaderWithLogo = (props: {componentId: string}) => {
  return (
    <HStack
      pl={'5px'}
      pr={'28px'}
      h={'40px'}
      mt={3}
      justifyContent={'space-between'}
      alignItems={'center'}>
      <IconButton
        icon={<ChevronLeftIcon />}
        size={'md'}
        _icon={{
          color: useColorModeValue('accent.800', 'accent.100'),
        }}
        _pressed={{
          bg: 'transparent',
        }}
        onPress={() => navigationService.goBack(props.componentId)}
      />
      <BrandBox w={'32px'} h={'32px'} borderRadius={12} fontSize={'sm'} />
    </HStack>
  );
};

export default HeaderWithLogo;
