import React, {useCallback, useMemo} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Avatar from '../components/Avatar';
import {actions as StorageActions} from '../redux/storageReducer';
import {colors} from '../utils/theme';

const CustomDrawerContent = ({navigation, currentRouteName}) => {
  const dispatch = useDispatch();
  const {account} = useSelector((state) => state.storageReducer);

  const _navigateToProfile = () => {
    navigation.navigate('Profile', {author: account.name});
  };

  const _logout = () => {
    dispatch(StorageActions.setAccount({}));
    navigation.navigate('Home', {logout: true});
    navigation.closeDrawer();
  };

  const _navigateToHome = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  const _navigateToReadlingList = useCallback(() => {
    navigation.navigate('ReadingList', {author: account.name});
  }, [account.name, navigation]);

  const _navigateToPublish = () => {
    navigation.navigate('Publish');
  };

  const isCurrentScreen = useCallback(
    (screenName) => {
      return currentRouteName === screenName;
    },
    [currentRouteName],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar style={styles.avatar} uri={account.avatar} />
        <Text style={styles.name}>{account.name}</Text>
        <TouchableOpacity onPress={_navigateToProfile}>
          <Text style={styles.viewProfile}>View profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <View
          style={{
            flex: 3,
            borderBottomWidth: 1,
            borderBottomColor: '#AAA',
            marginHorizontal: 5,
            justifyContent: 'space-around',
            paddingVertical: 30,
          }}>
          {useMemo(() => {
            const color = isCurrentScreen('Home') ? colors.black : '#666';
            return (
              <TouchableOpacity onPress={_navigateToHome} style={styles.row}>
                <Icon name="home" color={color} size={25} />
                <Text style={[styles.item, {color}]}>Home</Text>
              </TouchableOpacity>
            );
          }, [_navigateToHome, isCurrentScreen])}

          {useMemo(() => {
            const color = isCurrentScreen('ReadingList')
              ? colors.black
              : '#666';
            return (
              <TouchableOpacity
                onPress={_navigateToReadlingList}
                style={styles.row}>
                <Icon name="star" color={color} size={25} />
                <Text style={[styles.item, {color}]}>Reading List</Text>
              </TouchableOpacity>
            );
          }, [_navigateToReadlingList, isCurrentScreen])}

          <TouchableOpacity style={styles.row}>
            <Icon name="wallet" color={colors.dark_gray} size={25} />
            <Text style={styles.item}>Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={_navigateToPublish} style={styles.row}>
            <Icon name="pencil" color={colors.dark_gray} size={25} />
            <Text style={styles.item}>New Post</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{flex: 1}} /> */}
        <View
          style={{
            flex: 3,
            marginHorizontal: 5,
            paddingVertical: 30,
          }}>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={_logout} style={styles.row}>
              <Icon name="logout" color={colors.dark_gray} size={25} />
              <Text style={[styles.item]}>Sign out</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={_logout} style={styles.row} />
            <TouchableOpacity onPress={_logout} style={styles.row} />
            <TouchableOpacity onPress={_logout} style={styles.row} />
          </View>
          <TouchableOpacity style={{alignSelf: 'center'}}>
            <Text style={[styles.item, {color: '#000'}]}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.exexlight_gray,
  },
  avatarContainer: {
    flex: 3,
    paddingLeft: 30,
    justifyContent: 'space-evenly',
    backgroundColor: colors.white,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'rgba(2, 184, 117, 1)',
  },
  name: {
    fontSize: 20,
  },
  viewProfile: {
    fontSize: 20,
    color: '#666',
  },
  contentContainer: {
    flex: 7,
    backgroundColor: colors.exexlight_gray,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 30,
  },
  item: {
    fontSize: 20,
    lineHeight: 26,
    marginLeft: 30,
    color: '#666',
  },
});

export default React.memo(CustomDrawerContent);
