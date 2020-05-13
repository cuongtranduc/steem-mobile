import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import Avatar from '../Avatar';

import {fromNow} from '../../utils/time';
import {colors} from '../../utils/theme';
import * as Navigation from '../../navigation';

const Voter = ({voter}) => {
  const navigateToProfile = () => {
    Navigation.navigate('Profile', {author: voter.voter});
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

export default React.memo(Voter);
