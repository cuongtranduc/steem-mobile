import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Avatar from '../Avatar';

import {fromNow} from '../../utils/time';
import {colors} from '../../utils/theme';

const Voter = ({voter}) => {
  const navigation = useNavigation();
  const navigateToProfile = () => {
    navigation.navigate('Profile', {author: voter.voter});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToProfile}>
        <Avatar style={styles.avatar} author={voter.voter} />
      </TouchableOpacity>
      <View style={styles.postMetadata}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={navigateToProfile}>
            <Text style={styles.author}>{voter.voter}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.fromNow}>{fromNow(voter.time)}</Text>
      </View>
      <View style={{flex: 1}} />
      {/* {!hideOption && <PostMenu item={item} />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: colors.light_gray,
    borderWidth: 1,
  },
  author: {
    fontSize: 16,
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

export default React.memo(Voter);
