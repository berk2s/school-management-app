import React from 'react';
import {
  Box,
  Center,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  Button,
} from 'native-base';
import {BigSmallTexts, BrandBox} from '../../components';
import {LOGIN_SCREEN} from '../../navigation/Screens';
import {navigationService} from '../../services';

const WelcomeScreen = (props: any) => {
  return (
    <VStack flex={1} safeArea>
      <Center alignItems={'center'} justifyContent={'center'} flex={4}>
        <BrandBox
          w={106}
          h={106}
          marginBottom={35}
          borderRadius={24}
          fontSize={'4xl'}
        />
        <BigSmallTexts
          mainText={"E-Özşen'e hoşgeldin"}
          subText={'Devam etmek için giriş yapın'}
        />
      </Center>

      <Stack>
        <Box
          borderTopColor={useColorModeValue('accent.100', 'accent.500')}
          borderTopWidth={1}
          borderBottomColor={useColorModeValue('accent.100', 'accent.500')}
          borderBottomWidth={1}
          w={'full'}
          h={'72px'}
          px={25}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Text
            fontWeight={700}
            color={useColorModeValue('accent.400', 'white')}>
            Bir hesabım yok
          </Text>

          <Button
            size="sm"
            variant="ghost"
            _text={{
              fontWeight: 700,
              fontSize: 14,
            }}>
            Kaydol
          </Button>
        </Box>

        <Box
          borderBottomColor={useColorModeValue('accent.100', 'accent.500')}
          borderBottomWidth={1}
          w={'full'}
          h={'72px'}
          px={25}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Text
            fontWeight={700}
            color={useColorModeValue('accent.400', 'white')}>
            Zaten hesabım var
          </Text>

          <Button
            size="sm"
            variant="ghost"
            onPress={() => {
              navigationService.navigate(props.componentId, LOGIN_SCREEN);
            }}
            _text={{
              fontWeight: 700,
              fontSize: 14,
            }}>
            Giriş yap
          </Button>
        </Box>
      </Stack>
    </VStack>
  );
};

export default WelcomeScreen;
