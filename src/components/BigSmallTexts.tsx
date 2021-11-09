import {Text, useColorModeValue} from 'native-base';
import React from 'react';

const BigSmallTexts = (props: {mainText: string; subText: string}) => {
  const {mainText, subText} = props;
  return (
    <>
      <Text fontWeight={800} fontSize={'2xl'}>
        {mainText}
      </Text>
      <Text
        fontWeight={400}
        fontSize={'sm'}
        color={useColorModeValue('accent.400', 'accent.50')}>
        {subText}
      </Text>
    </>
  );
};

export default BigSmallTexts;
