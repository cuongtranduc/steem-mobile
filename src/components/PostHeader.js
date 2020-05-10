import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Avatar from './Avatar';
import PostMenu from './PostMenu';

import {fromNow} from '../utils/time';
import {colors} from '../utils/theme';
import * as Navigation from '../navigation';

const PostHeader = ({item, hideOption}) => {
  const navigateToProfile = () => {
    Navigation.navigate('Profile', {author: item.author});
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={navigateToProfile}>
        <Avatar style={styles.avatar} author={item.author} />
      </TouchableOpacity>
      <View style={styles.postMetadata}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={navigateToProfile}>
            <Text style={styles.author}>{item.author}</Text>
          </TouchableOpacity>
          {item.category && (
            <>
              <Text
                style={{fontSize: 14, color: colors.dark_gray, marginLeft: 10}}>
                in
              </Text>
              <Text style={{fontSize: 16, color: colors.primary}}>
                {` #${item.category}`}
              </Text>
            </>
          )}
        </View>
        <Text style={styles.fromNow}>{fromNow(item.last_update)}</Text>
      </View>
      <View style={{flex: 1}} />
      {!hideOption && <PostMenu item={item} />}
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

export default React.memo(PostHeader);
