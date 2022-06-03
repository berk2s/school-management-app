import {
  Box,
  HStack,
  Icon as NIcon,
  useColorModeValue,
  Text,
  Badge,
} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const ProfileModalItem = (props: any) => {
  const item = props.item.item;

  return (
    <Box w={'100%'} h={'56px'}>
      <TouchableOpacity onPress={props.onPress}>
        <HStack h={'100%'} alignItems={'center'} px={'10px'}>
          <Box mr={'10px'}>
            <NIcon
              as={<Icon name={item.icon} size={30} />}
              size={'sm'}
              mr="5"
              color={useColorModeValue('accent.700', 'accent.100')}
            />
          </Box>

          <Box
            h={'100%'}
            w={'85%'}
            flexDirection={'row'}
            alignItems={'center'}
            borderBottomColor={useColorModeValue('gray.100', 'accent.700')}
            borderBottomWidth={1}>
            <Text
              color={useColorModeValue('accent.700', 'accent.100')}
              fontWeight={700}>
              {item.text}
            </Text>

            {item.notificationBadge && (
              <Box
                justifyContent={'center'}
                alignItems={'center'}
                ml={2}
                borderRadius={50}
                w={'22px'}
                h={'22px'}
                background={'green.400'}>
                <Text fontSize={12} fontWeight={900} color={'#fff'}>
                  1
                </Text>
              </Box>
            )}
          </Box>
        </HStack>
      </TouchableOpacity>
    </Box>
  );
};

export default ProfileModalItem;
