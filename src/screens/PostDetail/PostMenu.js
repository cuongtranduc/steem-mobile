import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {submitVote} from '../../providers/dsteem';

import {colors} from '../../utils/theme';

const PostMenu = ({post, isVoted, getActiveVotes, checkVoted}) => {
  const [loading, setLoading] = useState(false);

  const _submitVote = async () => {
    if (isVoted) return;
    try {
      setLoading(true);
      const result = await submitVote(post.author, post.permlink);
      const activeVotes = await getActiveVotes();
      checkVoted(activeVotes);
      console.log('result', result);
    } catch (err) {
      console.log('error', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.footer}>
      {loading ? (
        <ActivityIndicator size="small" />
      ) : (
        <TouchableOpacity
          onPress={_submitVote}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name="heart"
            size={21}
            color={isVoted ? '#f77' : colors.dark_gray}
          />
        </TouchableOpacity>
      )}
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
  },
});

export default React.memo(PostMenu);
