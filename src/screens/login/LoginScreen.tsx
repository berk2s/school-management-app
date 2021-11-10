import React from 'react';

import {
  Center,
  Input,
  useColorModeValue,
  VStack,
  Icon as NIcon,
  Flex,
  Spacer,
  Button,
  FormControl,
  KeyboardAvoidingView,
} from 'native-base';
import {BigSmallTexts, HeaderWithLogo} from '../../components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Dimensions, Platform} from 'react-native';

const LoginScreen = (props: {componentId: string}) => {
  return (
    <VStack flex={1} safeArea>
      <KeyboardAvoidingView
        h={{
          base: Dimensions.get('window').height - 50,
          lg: 'auto',
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <HeaderWithLogo componentId={props.componentId} />
        <Center alignItems={'center'} justifyContent={'center'} flex={2}>
          <BigSmallTexts
            mainText={"E-Özşen'e hoşgeldin"}
            subText={'Devam etmek için giriş yapın'}
          />
        </Center>

        <FormControl pb={30}>
          <Flex h={230} px={28} flexDirection="column">
            <Input
              size="lg"
              placeholder="Kullanıcı adı"
              height={'72px'}
              borderRadius={8}
              px={'20px'}
              borderColor={useColorModeValue('accent.100', 'accent.200')}
              fontWeight={700}
              color={useColorModeValue('primary.800', 'accent.200')}
              placeholderTextColor={useColorModeValue(
                'accent.100',
                'accent.300',
              )}
              autoCapitalize={'none'}
              InputRightElement={
                <NIcon
                  as={<Icon name="email" size={30} />}
                  size={'sm'}
                  mr="5"
                  color={useColorModeValue('accent.400', 'accent.100')}
                />
              }
            />

            <Spacer />

            <Input
              type="password"
              size="lg"
              placeholder="Şifre"
              height={'72px'}
              borderRadius={8}
              px={'20px'}
              borderColor={useColorModeValue('accent.100', 'accent.200')}
              fontWeight={700}
              color={useColorModeValue('primary.800', 'accent.200')}
              placeholderTextColor={useColorModeValue(
                'accent.100',
                'accent.300',
              )}
              autoCapitalize={'none'}
              InputRightElement={
                <NIcon
                  as={<Icon name="remove-red-eye" size={30} color="#900" />}
                  size={'sm'}
                  mr="5"
                  color={useColorModeValue('accent.400', 'accent.100')}
                />
              }
            />

            <Spacer />

            <Button
              _text={{
                fontWeight: 700,
                fontSize: 15,
              }}
              borderRadius={'10px'}
              h={'50px'}
              size={'lg'}>
              Giriş Yap
            </Button>
          </Flex>
        </FormControl>
      </KeyboardAvoidingView>
    </VStack>
  );
};

export default LoginScreen;
