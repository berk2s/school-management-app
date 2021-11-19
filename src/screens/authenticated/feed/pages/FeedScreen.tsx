import {Text} from 'native-base';
import React, {useEffect} from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {fetchAnnouncements, logout} from '../../../../redux/actions';

const FeedScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, []);

  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => {
          dispatch(fetchAnnouncements());
        }}>
        <Text>Request</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch(logout());
        }}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default FeedScreen;
