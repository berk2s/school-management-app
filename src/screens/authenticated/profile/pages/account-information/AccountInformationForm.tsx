import {
  Button,
  FormControl,
  Icon as NIcon,
  Input,
  ScrollView,
  Spinner,
  Text,
  useColorModeValue,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import React, {useEffect, useState} from 'react';
import {UserInfo} from '../../../../../redux/types';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../../redux/reducers';
import {
  sendFlashNotification,
  updateProfile,
} from '../../../../../redux/actions';
import {validateEmail} from '../../../../../utils/validation-helper';
import {UpdatingUserProfile} from '../../../../../services/user/user.types';
import {validationService} from '../../../../../services';

interface FormData {
  firstName?: string;
  lastName?: string;
  username?: string;
  phoneNumber?: string;
  email?: string;
}

interface FormErrors {
  firstName?: boolean;
  lastName?: boolean;
  username?: boolean;
  phoneNumber?: boolean;
  email?: boolean;
}

const AccountInformationForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const {isFetching} = useSelector((state: RootState) => state.network);

  const userInfo: UserInfo = useSelector(
    (state: RootState) => state.auth.userInfo,
  );

  useEffect(() => {
    setFormData({
      firstName: formData.firstName ? formData.firstName : userInfo.firstName,
      lastName: formData.lastName ? formData.lastName : userInfo.lastName,
      username: formData.username ? formData.username : userInfo.username,
      phoneNumber: formData.phoneNumber
        ? formData.phoneNumber
        : userInfo.phoneNumber,
      email: formData.email ? formData.email : userInfo.email,
    });
  }, [userInfo]);

  const isFormValid = async (): Promise<boolean> => {
    if (
      formData.firstName !== undefined &&
      (formData.firstName.trim().length === 0 || formData.firstName.length < 3)
    ) {
      setErrors({
        ...errors,
        firstName: true,
      });

      dispatch(
        sendFlashNotification({
          text: 'L??tfen ge??erli bir isim giriniz',
          type: 'warning',
        }),
      );

      return false;
    } else if (
      formData.lastName !== undefined &&
      (formData.lastName.trim().length === 0 || formData.lastName.length < 3)
    ) {
      setErrors({
        ...errors,
        lastName: true,
      });

      dispatch(
        sendFlashNotification({
          text: 'L??tfen ge??erli bir soyisim giriniz',
          type: 'warning',
        }),
      );

      return false;
    } else if (
      formData.username !== undefined &&
      (formData.username.trim().length === 0 || formData.username.length < 3)
    ) {
      setErrors({
        ...errors,
        username: true,
      });

      dispatch(
        sendFlashNotification({
          text: 'L??tfen ge??erli bir kullan??c?? ad?? giriniz',
          type: 'warning',
        }),
      );

      return false;
    } else if (
      formData.phoneNumber !== undefined &&
      formData.phoneNumber.trim() !== '' &&
      (formData.phoneNumber.length < 10 ||
        formData.phoneNumber.length > 11 ||
        (formData.phoneNumber.length === 11 &&
          !formData.phoneNumber.startsWith('05')) ||
        (formData.phoneNumber.length === 10 &&
          !formData.phoneNumber.startsWith('5')))
    ) {
      dispatch(
        sendFlashNotification({
          text: 'L??tfen ge??erli bir telefon numaras?? giriniz',
          type: 'warning',
        }),
      );

      return false;
    } else if (
      formData.email !== undefined &&
      formData.email.trim() !== '' &&
      !validateEmail(formData.email)
    ) {
      setErrors({
        ...errors,
        email: true,
      });

      dispatch(
        sendFlashNotification({
          text: 'L??tfen ge??erli bir e-posta giriniz',
          type: 'warning',
        }),
      );

      return false;
    } else if (
      formData.username !== undefined &&
      formData.username.trim() !== userInfo.username
    ) {
      try {
        const isUsernameTaken = await validationService.isUsernameTaken(
          formData.username.trim(),
        );

        if (isUsernameTaken) {
          setErrors({
            ...errors,
            username: true,
          });

          dispatch(
            sendFlashNotification({
              text: 'Bu kullan??c?? ad?? zaten al??nm????',
              type: 'warning',
            }),
          );
          return false;
        }
      } catch (err) {
        return false;
      }
    } else if (
      formData.phoneNumber !== undefined &&
      formData.phoneNumber.trim() !== userInfo.phoneNumber
    ) {
      try {
        const isPhoneNumberTaken = await validationService.isPhoneNumberTaken(
          formData.phoneNumber.trim(),
        );

        if (isPhoneNumberTaken) {
          setErrors({
            ...errors,
            phoneNumber: true,
          });

          dispatch(
            sendFlashNotification({
              text: 'Bu telefon numaras?? zaten al??nm????',
              type: 'warning',
            }),
          );

          return false;
        }
      } catch (err) {
        console.log(err);

        return false;
      }
    } else if (
      formData.email !== undefined &&
      formData.email.trim() !== userInfo.email
    ) {
      try {
        const isEmailTaken = await validationService.isEmailTaken(
          formData.email.trim(),
        );

        if (isEmailTaken) {
          setErrors({
            ...errors,
            email: true,
          });

          dispatch(
            sendFlashNotification({
              text: 'Bu E-Posta zaten al??nm????',
              type: 'warning',
            }),
          );

          return false;
        }
      } catch (err) {
        return false;
      }
    }

    return true;
  };

  const saveChanges = async () => {
    const _isFormValid = await isFormValid();
    if (_isFormValid) {
      setErrors({});
      let updatingProfile: UpdatingUserProfile = {};

      Object.keys(formData).forEach((key: any) => {
        if (userInfo[key] !== formData[key]) {
          updatingProfile = {
            ...updatingProfile,
            [key]: (formData[key] as string).trim(),
          };
        }
      });

      if (Object.keys(updatingProfile).length > 0) {
        dispatch(updateProfile(updatingProfile));
      }
    }
  };

  return (
    <ScrollView h={'520px'} background={useColorModeValue('#fff', '#1C1C1E')}>
      <FormControl mb={'25px'} isInvalid={'firstName' in errors}>
        <Text
          fontWeight={400}
          fontSize={'12px'}
          px={'4px'}
          color={useColorModeValue('accent.400', 'accent.100')}>
          ??sim
        </Text>
        <Input
          height={'48px'}
          borderTopWidth={'0px'}
          borderLeftWidth={'0px'}
          borderRightWidth={'0px'}
          borderRadius={0}
          fontSize={'14px'}
          px={'4px'}
          placeholder={'??sim'}
          value={formData?.firstName}
          onChangeText={value => {
            setFormData({
              ...formData,
              firstName: value,
            });
          }}
          autoCapitalize={'none'}
          InputRightElement={
            <NIcon
              as={<Icon name="person" size={28} />}
              size={'20px'}
              mr="2"
              color={useColorModeValue('accent.400', 'accent.100')}
            />
          }
        />
      </FormControl>

      <FormControl mb={'25px'} isInvalid={'lastName' in errors}>
        <Text
          fontWeight={400}
          fontSize={'12px'}
          px={'4px'}
          color={useColorModeValue('accent.400', 'accent.100')}>
          Soyisim
        </Text>
        <Input
          height={'48px'}
          borderTopWidth={'0px'}
          borderLeftWidth={'0px'}
          borderRightWidth={'0px'}
          borderRadius={0}
          fontSize={'14px'}
          px={'4px'}
          placeholder={'Soyisim'}
          value={formData?.lastName}
          onChangeText={value =>
            setFormData({
              ...formData,
              lastName: value,
            })
          }
          autoCapitalize={'none'}
          InputRightElement={
            <NIcon
              as={<Icon name="person" size={28} />}
              size={'20px'}
              mr="2"
              color={useColorModeValue('accent.400', 'accent.100')}
            />
          }
        />
      </FormControl>

      <FormControl mb={'25px'} isInvalid={'username' in errors}>
        <Text
          fontWeight={400}
          fontSize={'12px'}
          px={'4px'}
          color={useColorModeValue('accent.400', 'accent.100')}>
          Kullan??c?? ad??
        </Text>
        <Input
          height={'48px'}
          borderTopWidth={'0px'}
          borderLeftWidth={'0px'}
          borderRightWidth={'0px'}
          borderRadius={0}
          fontSize={'14px'}
          px={'4px'}
          placeholder={'Kullan??c?? ad??'}
          value={formData?.username}
          onChangeText={value =>
            setFormData({
              ...formData,
              username: value,
            })
          }
          autoCapitalize={'none'}
          InputRightElement={
            <NIcon
              as={<Icon name="verified-user" size={28} />}
              size={'20px'}
              mr="2"
              color={useColorModeValue('accent.400', 'accent.100')}
            />
          }
        />
      </FormControl>

      <FormControl mb={'25px'} isInvalid={'phoneNumber' in errors}>
        <Text
          fontWeight={400}
          fontSize={'12px'}
          px={'4px'}
          color={useColorModeValue('accent.400', 'accent.100')}>
          Telefon numaras??
        </Text>
        <Input
          height={'48px'}
          borderTopWidth={'0px'}
          borderLeftWidth={'0px'}
          borderRightWidth={'0px'}
          borderRadius={0}
          fontSize={'14px'}
          px={'4px'}
          placeholder={'Telefon numaras??'}
          value={formData?.phoneNumber}
          onChangeText={value =>
            setFormData({
              ...formData,
              phoneNumber: value,
            })
          }
          autoCapitalize={'none'}
          InputRightElement={
            <NIcon
              as={<Icon name="smartphone" size={28} />}
              size={'20px'}
              mr="2"
              color={useColorModeValue('accent.400', 'accent.100')}
            />
          }
        />
      </FormControl>

      <FormControl mb={'25px'} isInvalid={'email' in errors}>
        <Text
          fontWeight={400}
          fontSize={'12px'}
          px={'4px'}
          color={useColorModeValue('accent.400', 'accent.100')}>
          E-Posta
        </Text>
        <Input
          height={'48px'}
          borderTopWidth={'0px'}
          borderLeftWidth={'0px'}
          borderRightWidth={'0px'}
          borderRadius={0}
          fontSize={'14px'}
          px={'4px'}
          placeholder={'E-Posta'}
          value={formData?.email}
          onChangeText={value =>
            setFormData({
              ...formData,
              email: value,
            })
          }
          autoCapitalize={'none'}
          InputRightElement={
            <NIcon
              as={<Icon name="email" size={28} />}
              size={'20px'}
              mr="2"
              color={useColorModeValue('accent.400', 'accent.100')}
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
        {isFetching ? <Spinner /> : 'Kaydet'}
      </Button>
    </ScrollView>
  );
};

export default AccountInformationForm;
