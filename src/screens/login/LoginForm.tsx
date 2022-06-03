import React, {useState} from 'react';
import {
  Button,
  Flex,
  FormControl,
  Input,
  Spacer,
  useColorModeValue,
  Icon as NIcon,
  IconButton,
  Stack,
  Spinner,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {login, sendFlashNotification} from '../../redux/actions';
import {RootState} from '../../redux/reducers';

const LoginForm = () => {
  const dispatch = useDispatch();

  const {isFetching} = useSelector((state: RootState) => state.network);

  const [formData, setFormData] = useState<{
    username?: string;
    password?: string;
  }>({});

  const [errors, setErrors] = useState<{
    username?: boolean;
    password?: boolean;
  }>({});

  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const handleShowPasswordClick = () => setIsPasswordShown(!isPasswordShown);

  const isFormValid = (): boolean => {
    if (
      formData.username === undefined ||
      formData.username.trim() === '' ||
      formData.username.length < 3
    ) {
      setErrors({
        ...errors,
        username: true,
      });

      dispatch(
        sendFlashNotification({
          text: 'Lütfen geçerli bir kullanıcı adı giriniz',
          type: 'warning',
        }),
      );

      return false;
    }

    if (
      formData.password === undefined ||
      formData.password.trim() === '' ||
      formData.password.length < 3
    ) {
      setErrors({
        ...errors,
        password: true,
      });

      dispatch(
        sendFlashNotification({
          text: 'Lütfen geçerli bir şifre giriniz',
          type: 'warning',
        }),
      );

      return false;
    }

    return true;
  };

  const handleSubmitting = () => {
    if (isFormValid()) {
      dispatch(
        login({
          username: formData.username as string,
          password: formData.password as string,
        }),
      );
    }
  };

  return (
    <Stack pb={30}>
      <Flex h={230} px={28} flexDirection="column">
        <FormControl isRequired isInvalid={'username' in errors}>
          <Input
            placeholder={'Kullanıcı adı'}
            autoCapitalize={'none'}
            InputRightElement={
              <NIcon
                as={<Icon name="email" size={30} />}
                size={'sm'}
                mr="5"
                color={useColorModeValue('accent.400', 'accent.100')}
              />
            }
            onChangeText={value =>
              setFormData({
                ...formData,
                username: value,
              })
            }
          />
        </FormControl>

        <Spacer />

        <FormControl isRequired isInvalid={'password' in errors}>
          <Input
            type={isPasswordShown ? 'text' : 'password'}
            placeholder="Şifre"
            height={'72px'}
            autoCapitalize={'none'}
            InputRightElement={
              <IconButton
                icon={
                  <NIcon
                    as={<Icon name="remove-red-eye" size={30} />}
                    size={'sm'}
                    color={useColorModeValue('accent.400', 'accent.100')}
                  />
                }
                size={'md'}
                _icon={{
                  color: useColorModeValue('accent.400', 'accent.100'),
                }}
                mr="3"
                _pressed={{
                  bg: useColorModeValue('accent.100', 'accent.400'),
                }}
                onPress={handleShowPasswordClick}
              />
            }
            onChangeText={value =>
              setFormData({
                ...formData,
                password: value,
              })
            }
          />
        </FormControl>

        <Spacer />

        <Button
          _text={{
            fontWeight: 700,
            fontSize: 15,
          }}
          borderRadius={'10px'}
          h={'50px'}
          onPress={handleSubmitting}
          disabled={isFetching}
          size={'lg'}>
          {isFetching ? <Spinner /> : 'Giriş yap'}
        </Button>
      </Flex>
    </Stack>
  );
};

export default LoginForm;
