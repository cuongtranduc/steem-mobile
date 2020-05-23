import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import isEmpty from 'lodash/isEmpty';

import {submitVote} from '../../providers/dsteem';
import {
  getPostFromBookmarks,
  bookmark,
  unBookmark,
} from '../../providers/firebase';

import {colors} from '../../utils/theme';

const PostMenu = ({post, isVoted, getActiveVotes, checkVoted, showAlert}) => {
  const [loading, setLoading] = useState(false);
  const [bmLoading, setBmLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    !isEmpty(post) && checkBookmark();
  }, [checkBookmark, post]);

  const checkBookmark = useCallback(async () => {
    try {
      const _post = await getPostFromBookmarks(post);
      setIsBookmarked(_post.exists);
      return _post.exists;
    } catch (error) {
      console.log('error', error);
    }
  }, [post]);

  const handleBookmark = async () => {
    try {
      setBmLoading(true);
      if (isBookmarked) {
        await unBookmark(post);
        setIsBookmarked(false);
        showAlert('Unbookmarked successfully');
      } else {
        await bookmark(post);
        setIsBookmarked(true);
        showAlert('Bookmarked successfully');
      }
    } catch (err) {
      console.log('error', err);
    } finally {
      setBmLoading(false);
    }
  };

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
      showAlert('Voted successfully');
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
      {bmLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <TouchableOpacity
          onPress={handleBookmark}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name="bookmark"
            size={21}
            color={isBookmarked ? '#fac35a' : colors.dark_gray}
          />
        </TouchableOpacity>
      )}
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
