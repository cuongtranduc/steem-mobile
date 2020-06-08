import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {View, FlatList, StyleSheet, ActivityIndicator} from 'react-native';

import Post from './Post';
import PostPlaceHolderList from '../PostPlaceHolderList';
import {getPosts} from '../../redux/postReducer/operations';
import {actions as postActions} from '../../redux/postReducer';
import {getPosts as getMorePosts} from '../../providers/dsteem';
import {colors} from '../../utils/theme';

const PostList = () => {
  const isCancelled = React.useRef(false);
  const onEndReachedCalledDuringMomentum = React.useRef(true);
  const dispatch = useDispatch();
  const [isRefresh, setIsRefresh] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const {posts, isLoading} = useSelector((state) => state.postReducer);
  useEffect(() => {
    _getPost();
  }, [_getPost]);

  const _renderItem = ({item, index}) => {
    return (
      <>
        <Post item={item} />
        {index === posts.length - 1 && loadMore && (
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

  const _getPost = useCallback(() => !isLoading && dispatch(getPosts()), [
    dispatch,
    isLoading,
  ]);

  const _onEndReached = useCallback(async () => {
    try {
      if (!onEndReachedCalledDuringMomentum.current) {
        setLoadMore(true);
        const lastPost = posts[posts.length - 1];
        const newPosts = await getMorePosts({
          limit: 6,
          start_author: lastPost.author,
          start_permlink: lastPost.permlink,
        });
        newPosts.shift();
        if (!isCancelled.current) {
          dispatch(postActions.setPosts(posts.concat(newPosts)));
        }
        onEndReachedCalledDuringMomentum.current = true;
      }
    } catch (err) {
      console.log('err', err);
    } finally {
      setLoadMore(false);
    }
  }, [dispatch, posts]);

  const _onRefresh = () => {
    setIsRefresh(true);
    setTimeout(() => setIsRefresh(false), 1500);
    _getPost();
  };

  return (
    <FlatList
      ListEmptyComponent={PostPlaceHolderList}
      data={posts}
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
  );
};

const styles = StyleSheet.create({
  itemSeperator: {
    height: 5,
    backgroundColor: colors.exexlight_gray,
  },
});

export default PostList;
