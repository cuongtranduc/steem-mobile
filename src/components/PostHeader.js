import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Avatar from './Avatar';

import {fromNow} from '../utils/time';
import {colors} from '../utils/theme';
import * as Navigation from '../navigation';

const Post = ({item}) => {
  const navigateToProfile = () => {
    Navigation.navigate('Profile', {author: item.author});
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={navigateToProfile}>
        <Avatar style={styles.avatar} author={item.author} />
      </TouchableOpacity>
      <View style={styles.postMetadata}>
        <TouchableOpacity onPress={navigateToProfile}>
          <Text style={styles.author}>{item.author}</Text>
        </TouchableOpacity>
        <Text style={styles.fromNow}>{fromNow(item.last_update)}</Text>
      </View>
      <View style={{flex: 1}} />
      <Icon name="dots-vertical" size={24} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: colors.light_gray,
    borderWidth: 1,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  fromNow: {
    fontSize: 14,
    color: colors.dark_gray,
  },
  postMetadata: {
    paddingLeft: 15,
    justifyContent: 'center',
  },
});

export default Post;
