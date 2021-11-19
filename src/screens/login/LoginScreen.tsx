import React from 'react';

import {Center, VStack, KeyboardAvoidingView} from 'native-base';
import {BigSmallTexts, HeaderWithLogo} from '../../components';
import {Dimensions, Platform} from 'react-native';
import LoginForm from './LoginForm';

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

        <LoginForm />
      </KeyboardAvoidingView>
    </VStack>
  );
};

export default LoginScreen;
