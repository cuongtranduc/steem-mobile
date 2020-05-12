import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {View, FlatList, StyleSheet} from 'react-native';

import Post from './Post';
import PostPlaceHolderList from '../PostPlaceHolderList';
import {getPosts} from '../../redux/postReducer/operations';
import {colors} from '../../utils/theme';

const PostList = () => {
  const dispatch = useDispatch();
  const [isRefresh, setIsRefresh] = useState(false);
  const {posts, isLoading} = useSelector((state) => state.postReducer);
  useEffect(() => {
    _getPost();
  }, [_getPost]);

  const _renderItem = ({item}) => {
    return <Post item={item} />;
  };

  const _getPost = useCallback(() => !isLoading && dispatch(getPosts()), [
    dispatch,
    isLoading,
  ]);

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
