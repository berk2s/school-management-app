import {
  Button,
  FormControl,
  Icon as NIcon,
  IconButton,
  Input,
  ScrollView,
  Spinner,
  Text,
  useColorModeValue,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../../redux/reducers';
import {
  changePassword,
  sendFlashNotification,
} from '../../../../../redux/actions';
import {ChangingPassword} from '../../../../../services';

interface FormData {
  currentPassword?: string;
  newPassword?: string;
  newPasswordConfirm?: string;
}

interface FormErrors {
  currentPassword?: boolean;
  newPassword?: boolean;
  newPasswordConfirm?: boolean;
  isPwdWeak?: boolean;
}

const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] =
    useState<boolean>(false);
  const {isFetching} = useSelector((state: RootState) => state.network);

  useEffect(() => {
    setFormData({
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    });
  }, []);

  const isFormValid = async (): Promise<boolean> => {
    if (
      formData.currentPassword !== undefined &&
      (formData.currentPassword.trim().length === 0 ||
        formData.currentPassword.length < 6)
    ) {
      setErrors({
        ...errors,
        currentPassword: true,
      });

      dispatch(
        sendFlashNotification({
          text: 'Mevcut şifreniz hatalı',
          type: 'warning',
        }),
      );

      return false;
    } else if (
      formData.newPassword !== undefined &&
      (formData.newPassword.trim().length === 0 ||
        formData.newPassword.length < 6)
    ) {
      setErrors({
        ...errors,
        newPassword: true,
      });

      dispatch(
        sendFlashNotification({
          text: 'Lütfen en az altı haneli bir şifre giriniz',
          type: 'warning',
        }),
      );

      return false;
    } else if (
      formData.newPasswordConfirm !== undefined &&
      (formData.newPasswordConfirm.trim().length === 0 ||
        formData.newPasswordConfirm.length < 3)
    ) {
      setErrors({
        ...errors,
        newPasswordConfirm: true,
      });

      dispatch(
        sendFlashNotification({
          text: 'Lütfen şifre doğrulama bölümünü giriniz',
          type: 'warning',
        }),
      );

      return false;
    } else if (formData.newPassword !== formData.newPasswordConfirm) {
      setErrors({
        ...errors,
        newPasswordConfirm: true,
      });

      dispatch(
        sendFlashNotification({
          text: 'Yeni şifreler eşleşmiyor',
          type: 'warning',
        }),
      );
      return false;
    } else if (
      formData.newPassword !== undefined &&
      !pwdStrength(formData.newPassword as string)
    ) {
      setErrors({
        ...errors,
        newPassword: true,
      });

      dispatch(
        sendFlashNotification({
          text: 'Şifreniz; en az bir büyük harf, en az bir sayı ve en az 6 haneden oluşmalıdır',
          type: 'warning',
        }),
      );

      return false;
    }

    return true;
  };

  const pwdStrength = (pwd: string): boolean => {
    const pwdRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{6,}$/;
    return pwdRegex.test(pwd);
  };

  const saveChanges = async () => {
    const _isFormValid = await isFormValid();
    if (_isFormValid) {
      const changingPassword: ChangingPassword = {
        currentPassword: formData.currentPassword
          ? formData.currentPassword.trim()
          : '',
        newPassword: formData.newPassword ? formData.newPassword.trim() : '',
        newPasswordConfirm: formData.newPasswordConfirm
          ? formData.newPasswordConfirm.trim()
          : '',
      };

      dispatch(changePassword(changingPassword));
    }
  };

  return (
    <ScrollView h={'520px'} background={useColorModeValue('#fff', '#1C1C1E')}>
      <FormControl mb={'25px'} isInvalid={'currentPassword' in errors}>
        <Text
          fontWeight={400}
          fontSize={'12px'}
          px={'4px'}
          color={useColorModeValue('accent.400', 'accent.100')}>
          Mevcut Şifre
        </Text>
        <Input
          type={'password'}
          height={'48px'}
          borderTopWidth={'0px'}
          borderLeftWidth={'0px'}
          borderRightWidth={'0px'}
          borderRadius={0}
          fontSize={'14px'}
          px={'4px'}
          placeholder={'Mevcut Şifre'}
          value={formData?.currentPassword}
          onChangeText={value => {
            setFormData({
              ...formData,
              currentPassword: value.trim(),
            });
          }}
          autoCapitalize={'none'}
          InputRightElement={
            <NIcon
              as={<Icon name="lock-open" size={28} />}
              size={'20px'}
              mr="2"
              color={useColorModeValue('accent.400', 'accent.100')}
            />
          }
        />
      </FormControl>

      <FormControl mb={'25px'} isInvalid={'newPassword' in errors}>
        <Text
          fontWeight={400}
          fontSize={'12px'}
          px={'4px'}
          color={useColorModeValue('accent.400', 'accent.100')}>
          Yeni Şifre
        </Text>
        <Input
          type={showNewPassword ? 'text' : 'password'}
          height={'48px'}
          borderTopWidth={'0px'}
          borderLeftWidth={'0px'}
          borderRightWidth={'0px'}
          borderRadius={0}
          fontSize={'14px'}
          px={'4px'}
          placeholder={'Yeni Şifre'}
          value={formData?.newPassword}
          onChangeText={value => {
            if (!pwdStrength(value)) {
              setErrors({
                ...errors,
                newPassword: true,
                isPwdWeak: true,
              });
            } else {
              setErrors({
                ...errors,
                newPassword: false,
                isPwdWeak: false,
              });
            }
            setFormData({
              ...formData,
              newPassword: value.trim(),
            });
          }}
          autoCapitalize={'none'}
          InputRightElement={
            <IconButton
              icon={
                <NIcon
                  as={<Icon name="remove-red-eye" />}
                  size={'20px'}
                  color={useColorModeValue('accent.400', 'accent.100')}
                />
              }
              size={'md'}
              _icon={{
                color: useColorModeValue('accent.400', 'accent.100'),
              }}
              _pressed={{
                bg: useColorModeValue('accent.100', 'accent.400'),
              }}
              onPress={() => setShowNewPassword(!showNewPassword)}
            />
          }
        />

        {formData.newPassword !== undefined &&
        formData.newPassword.trim().length > 0 ? (
          errors.isPwdWeak ? (
            <Text
              mt={2}
              fontWeight={400}
              fontSize={'12px'}
              px={'4px'}
              color={useColorModeValue('red.500', 'red.500')}>
              Güçsüz şifre
            </Text>
          ) : (
            <Text
              mt={2}
              fontWeight={400}
              fontSize={'12px'}
              px={'4px'}
              color={useColorModeValue('green.500', 'green.500')}>
              Güçlü şifre
            </Text>
          )
        ) : (
          ''
        )}

        <Text
          mt={2}
          fontWeight={400}
          fontSize={'12px'}
          px={'4px'}
          color={useColorModeValue('accent.400', 'accent.100')}>
          Şifreniz; en az bir büyük harf, en az bir sayı ve en az 6 haneden
          oluşmalıdır
        </Text>
      </FormControl>

      <FormControl mb={'25px'} isInvalid={'newPasswordConfirm' in errors}>
        <Text
          fontWeight={400}
          fontSize={'12px'}
          px={'4px'}
          color={useColorModeValue('accent.400', 'accent.100')}>
          Yeni Şifre Tekrarı
        </Text>
        <Input
          type={showNewPasswordConfirm ? 'text' : 'password'}
          height={'48px'}
          borderTopWidth={'0px'}
          borderLeftWidth={'0px'}
          borderRightWidth={'0px'}
          borderRadius={0}
          fontSize={'14px'}
          px={'4px'}
          placeholder={'Yeni Şifre Tekrarı'}
          value={formData?.newPasswordConfirm}
          onChangeText={value => {
            if (
              formData.newPassword !== undefined &&
              formData.newPassword !== value
            ) {
              setErrors({
                ...errors,
                newPasswordConfirm: true,
              });
            } else {
              setErrors({
                ...errors,
                newPasswordConfirm: false,
              });
            }
            setFormData({
              ...formData,
              newPasswordConfirm: value.trim(),
            });
          }}
          autoCapitalize={'none'}
          InputRightElement={
            <IconButton
              icon={
                <NIcon
                  as={<Icon name="remove-red-eye" />}
                  size={'20px'}
                  color={useColorModeValue('accent.400', 'accent.100')}
                />
              }
              size={'md'}
              _icon={{
                color: useColorModeValue('accent.400', 'accent.100'),
              }}
              _pressed={{
                bg: useColorModeValue('accent.100', 'accent.400'),
              }}
              onPress={() => setShowNewPasswordConfirm(!showNewPasswordConfirm)}
            />
          }
        />
      </FormControl>

      <Button
        _text={{
          fontWeight: 700,
          fontSize: 15,
        }}
        borderRadius={'10px'}
        h={'50px'}
        onPress={saveChanges}
        disabled={isFetching}
        size={'lg'}>
        {isFetching ? <Spinner /> : 'Değiştir'}
      </Button>
    </ScrollView>
  );
};

export default ChangePasswordForm;
