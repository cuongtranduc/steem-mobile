import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import CommentPlaceHolderList from '../../components/CommentPlaceHolderList';
import PostHeader from '../../components/PostHeader';
import PostFooter from '../../components/PostFooter';
import {getUserComments} from '../../providers/dsteem';

import * as Navigation from '../../navigation';
import {colors} from '../../utils/theme';

const Comment = ({comment}) => {
  const navigateToDetail = useCallback(() => {
    Navigation.navigate('PostDetail', {
      data: [comment.parent_author, comment.parent_permlink],
      post: {
        author: comment.post_id,
        last_update: comment.last_update,
        category: comment.category,
      },
    });
  }, [comment]);

  return (
    <View
      style={{
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 10,
      }}>
      <PostHeader
        item={{
          author: comment.author,
          last_update: comment.last_update,
          category: comment.category,
        }}
        hideOption
      />
      <TouchableOpacity onPress={navigateToDetail}>
        <Text
          style={{marginTop: 10, fontSize: 14, fontWeight: 'bold'}}
          numberOfLines={2}>
          RE: {comment.root_title}
        </Text>
        <Text style={{marginTop: 10, fontSize: 16}}>{comment.body}</Text>
      </TouchableOpacity>
      <PostFooter item={comment} hideShare showReply />
    </View>
  );
};

const UserComment = ({author}) => {
  const isCancelled = React.useRef(false);
  const onEndReachedCalledDuringMomentum = React.useRef(true);
  const [isRefresh, setIsRefresh] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getComments();

    return () => {
      isCancelled.current = true;
    };
  }, [getComments]);

  const _renderItem = ({item, index}) => {
    return (
      <>
        <Comment comment={item} />
        {index === comments.length - 1 && isLoading && (
          <View style={{marginVertical: 10}}>
            <ActivityIndicator
              size="large"
              animating={true}
              color={colors.primary}
            />
          </View>
        )}
      </>
    );
  };

  const getComments = useCallback(async () => {
    if (!author) {
      return;
    }
    try {
      const _comments = await getUserComments({
        start_author: author,
        start_permlink: undefined,
      });
      if (!isCancelled.current) {
        console.log('_comments', _comments);
        setComments(_comments);
      }
    } catch (err) {
      console.log('err', err);
    }
  }, [author]);

  const _onRefresh = () => {
    setIsRefresh(true);
    setTimeout(() => setIsRefresh(false), 1500);
    getComments();
  };

  const _onEndReached = useCallback(async () => {
    try {
      if (!onEndReachedCalledDuringMomentum.current) {
        setIsLoading(true);
        const lastComment = comments[comments.length - 1];
        const newComments = await getUserComments({
          limit: 11,
          start_author: lastComment.author,
          start_permlink: lastComment.permlink,
        });
        newComments.shift();
        if (!isCancelled.current) {
          setComments(comments.concat(newComments));
        }
        onEndReachedCalledDuringMomentum.current = true;
      }
    } catch (err) {
      console.log('err', err);
    } finally {
      setIsLoading(false);
    }
  }, [comments]);

  return (
    <View style={{flex: 1, backgroundColor: colors.exexlight_gray}}>
      <FlatList
        contentContainerStyle={{
          paddingVertical: 5,
          paddingHorizontal: 15,
          backgroundColor: colors.exexlight_gray,
        }}
        ListEmptyComponent={CommentPlaceHolderList}
        data={comments}
        renderItem={_renderItem}
        keyExtractor={(item) => item.post_id.toString()}
        ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
        onRefresh={_onRefresh}
        refreshing={isRefresh}
        onEndReached={_onEndReached}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemSeperator: {
    height: 5,
    backgroundColor: colors.exexlight_gray,
  },
});

export default React.memo(UserComment);
