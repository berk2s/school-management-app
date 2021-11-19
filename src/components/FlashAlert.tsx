import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {clearFlashMessage} from '../redux/actions';
import {navigationService} from '../services';
import FlashMessage from 'react-native-flash-message';

const FlashAlert = (props: any) => {
  const dispatch = useDispatch();

  const {componentId} = props;
  const dismiss = () => navigationService.dismissOverlay(componentId);

  const [timer, setTimer] = useState<null | ReturnType<typeof setTimeout>>(
    null,
  );

  useEffect(() => {
    let _timer: null | ReturnType<typeof setTimeout> = null;

    _timer = setTimeout(() => {
      dispatch(clearFlashMessage());
      dismiss();
    }, 3000);

    setTimer(_timer);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  return (
    <View
      style={{
        height: 50,
        width: '100%',
      }}>
      <FlashMessage position={'top'} />
    </View>
  );
};

export default FlashAlert;
