import {Text, useColorModeValue, VStack} from 'native-base';
import React from 'react';

const ProfileInformation = (props: any) => {
  const {mainText, subText} = props;
  return (
    <VStack
      _dark={{
        bg: 'transparent',
      }}>
      <Text
        color={useColorModeValue('accent.900', 'accent.100')}
        fontSize={'22px'}
        fontWeight={800}>
        {mainText}
      </Text>
      <Text
        color={useColorModeValue('accent.400', 'accent.300')}
        fontWeight={400}>
        {subText}
      </Text>
    </VStack>
  );
};

export default ProfileInformation;
