import {Box, Text, useColorModeValue} from 'native-base';
import React from 'react';

const BrandBox = (props: any) => {
  return (
    <Box
      bg={useColorModeValue('primary.500', 'primary.400')}
      {...props}
      borderRadius={24}
      alignItems="center"
      justifyContent="center">
      <Text
        fontWeight={800}
        fontSize={'4xl'}
        color={useColorModeValue('white', 'white')}>
        E+
      </Text>
    </Box>
  );
};

export default BrandBox;
