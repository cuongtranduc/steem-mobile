import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors} from '../../utils/theme';
import {sbdToDollar} from '../../utils/money';

const PostFooter = ({item, isVoted, activeVotes}) => {
  return (
    <View style={styles.footer}>
      <Text style={styles.payout}>
        {sbdToDollar(item.pending_payout_value)}
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name="heart"
          size={18}
          color={isVoted ? '#f77' : colors.dark_gray}
        />
        <Text style={styles.votes}>{activeVotes.length}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="comment-multiple" size={18} color={colors.dark_gray} />
        <Text style={styles.votes}>{item.children}</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="share" size={18} color={colors.dark_gray} />
        <Text style={styles.votes}>0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  payout: {
    fontSize: 18,
    lineHeight: 21,
  },
  votes: {
    marginLeft: 3,
    fontSize: 18,
    lineHeight: 21,
  },
});

export default PostFooter;
