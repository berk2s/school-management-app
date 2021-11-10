import {Box, Text, useColorModeValue} from 'native-base';
import React from 'react';

const BrandBox = (props: any) => {
  return (
    <Box
      bg={useColorModeValue('primary.500', 'primary.400')}
      {...props}
      alignItems="center"
      justifyContent="center">
      <Text
        fontWeight={800}
        fontSize={props.fontSize}
        color={useColorModeValue('white', 'white')}>
        E+
      </Text>
    </Box>
  );
};

export default BrandBox;
