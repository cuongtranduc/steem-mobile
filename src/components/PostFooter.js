import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {sbdToDollar} from '../utils/money';
import {colors} from '../utils/theme';
import {navigate} from '../navigation';

const PostFooter = ({item, hideShare, showReply, activeVotes = []}) => {
  const {username} = useSelector((state) => state.storageReducer.account);
  const [isVoted, setIsVoted] = useState(false);

  useEffect(() => {
    if (activeVotes.length > 0) {
      const _isVoted = activeVotes.some((vote) => vote.voter === username);
      setIsVoted(_isVoted);
    }
  }, [activeVotes, username]);

  const _navigateToVoters = () => {
    navigate('Voters', {voters: activeVotes});
  };

  return (
    <View style={styles.footer}>
      <Text style={styles.payout}>
        {sbdToDollar(item.pending_payout_value)}
      </Text>
      <View
        style={{marginLeft: 15, flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name="heart"
          size={18}
          color={isVoted ? '#f77' : colors.dark_gray}
        />
        <TouchableOpacity onPress={_navigateToVoters}>
          <Text style={styles.votes}>{item.active_votes.length}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{marginLeft: 15, flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name={showReply ? 'message-reply-text' : 'comment-multiple'}
          size={18}
          color={colors.dark_gray}
        />
        <Text style={styles.votes}>{item.children}</Text>
      </View>
      <View style={{flex: 1}} />
      {!hideShare && (
        <View
          style={{marginRight: 5, flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="share" size={18} color={colors.dark_gray} />
          <Text style={styles.votes}>0</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    marginTop: 15,
    flexDirection: 'row',
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

export default React.memo(PostFooter);
