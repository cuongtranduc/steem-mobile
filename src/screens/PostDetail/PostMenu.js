import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {submitVote} from '../../providers/dsteem';

import {colors} from '../../utils/theme';

const PostMenu = ({post, isVoted}) => {
  const _submitVote = async () => {
    try {
      const result = await submitVote(post.author, post.permlink);
      console.log('result', result);
    } catch (err) {
      console.log('error', err);
    }
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={_submitVote}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name="heart"
          size={21}
          color={isVoted ? '#f77' : colors.dark_gray}
        />
      </TouchableOpacity>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="message-reply-text" size={21} color={colors.dark_gray} />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="share-variant" size={21} color={colors.dark_gray} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.white,
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default React.memo(PostMenu);
