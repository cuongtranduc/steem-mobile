import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Avatar from '../components/Avatar';
import {actions as StorageActions} from '../redux/storageReducer';
import {colors} from '../utils/theme';

const CustomDrawerContent = ({navigation}) => {
  const dispatch = useDispatch();
  const {account} = useSelector((state) => state.storageReducer);

  const navigateToProfile = () => {
    navigation.navigate('Profile', {author: account.name});
  };

  const _logout = () => {
    dispatch(StorageActions.setAccount({}));
    navigation.closeDrawer();
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar style={styles.avatar} uri={account.avatar} />
        <Text style={styles.name}>{account.name}</Text>
        <TouchableOpacity onPress={navigateToProfile}>
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
          <TouchableOpacity style={styles.row}>
            <Icon name="home" color={colors.black} size={25} />
            <Text style={[styles.item, {color: colors.black}]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Icon name="star" color={colors.dark_gray} size={25} />
            <Text style={styles.item}>Reading List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Icon name="wallet" color={colors.dark_gray} size={25} />
            <Text style={styles.item}>Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}>
            <Icon name="pencil" color={colors.dark_gray} size={25} />
            <Text style={styles.item}>New Post</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}} />
        <View
          style={{
            flex: 3,
          }}>
          <View style={{flex: 1}} />
          <TouchableOpacity
            onPress={_logout}
            style={{alignSelf: 'center', marginBottom: 44}}>
            <Text style={[styles.item, {color: '#000'}]}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    flex: 3,
    padding: 30,
    justifyContent: 'space-around',
  },
  avatar: {
    marginTop: getStatusBarHeight() - 10,
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
