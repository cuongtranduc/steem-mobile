import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import Post from '../../components/PostList/Post';
import PostPlaceHolderList from '../../components/PostPlaceHolderList';

import {getBookmarks} from '../../providers/firebase';

import {colors} from '../../utils/theme';

const BookmarkList = () => {
  const {username} = useSelector((state) => state.storageReducer.account);
  const isCancelled = React.useRef(false);
  const onEndReachedCalledDuringMomentum = React.useRef(true);
  const [isRefresh, setIsRefresh] = useState(false);
  const [posts, setPosts] = useState([]);
  const [lastSnapshot, setLastSnapshot] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [enableLoadMore, setEnableLoadMore] = useState(true);

  useEffect(() => {
    _getPost();

    return () => {
      isCancelled.current = true;
    };
  }, [_getPost]);

  const _renderItem = ({item, index}) => {
    return (
      <>
        <Post item={item} />
        {index === posts.length - 1 && isLoading && (
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

  const _getPost = useCallback(async () => {
    if (!username) {
      return;
    }
    try {
      const querySnapshot = await getBookmarks();
      setLastSnapshot(querySnapshot.docs[querySnapshot.size - 1]);
      const _posts = [];
      querySnapshot.forEach((documentSnapshot) => {
        _posts.push(documentSnapshot.data());
      });
      if (!isCancelled.current) {
        setPosts(_posts);
      }
    } catch (err) {
      console.log('err', err);
    }
  }, [username]);

  const _onRefresh = () => {
    setIsRefresh(true);
    setTimeout(() => setIsRefresh(false), 1500);
    _getPost();
  };

  const _onEndReached = useCallback(async () => {
    if (!enableLoadMore) return;
    try {
      if (!onEndReachedCalledDuringMomentum.current) {
        setIsLoading(true);
        const querySnapshot = await getBookmarks(lastSnapshot);
        const _lastSnapshot = querySnapshot.docs[querySnapshot.size - 1];
        if (!_lastSnapshot) {
          setIsLoading(false);
          setEnableLoadMore(false);
          return;
        }
        setLastSnapshot(_lastSnapshot);
        const newPosts = [];
        querySnapshot.forEach((documentSnapshot) => {
          newPosts.push(documentSnapshot.data());
        });
        if (!isCancelled.current) {
          setPosts(posts.concat(newPosts));
        }
        onEndReachedCalledDuringMomentum.current = true;
      }
    } catch (err) {
      console.log('err', err);
    } finally {
      setIsLoading(false);
    }
  }, [enableLoadMore, lastSnapshot, posts]);

  return (
    <View style={{flex: 1, backgroundColor: colors.exexlight_gray}}>
      <FlatList
        contentContainerStyle={{
          paddingVertical: 5,
          paddingHorizontal: 15,
          backgroundColor: colors.exexlight_gray,
        }}
        ListEmptyComponent={PostPlaceHolderList}
        data={posts}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id.toString()}
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

export default React.memo(BookmarkList);
