import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import PostPlaceHolderList from '../../components/PostPlaceHolderList';
import PostHeader from '../../components/PostHeader';
import PostFooter from '../../components/PostFooter';
import {getUserComments} from '../../providers/dsteem';

import * as Navigation from '../../navigation';

const Comment = ({comment}) => {
  const navigateToDetail = useCallback(() => {
    Navigation.navigate('PostDetail', {
      data: [comment.author, comment.permlink],
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
      <PostFooter item={comment} hideShare />
    </View>
  );
};

const UserComment = ({author}) => {
  const isCancelled = React.useRef(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getComments();

    return () => {
      isCancelled.current = true;
    };
  }, [getComments]);

  const _renderItem = ({item}) => {
    return <Comment comment={item} />;
  };

  const getComments = useCallback(async () => {
    if (!author) {
      return;
    }
    try {
      const _comments = await getUserComments({author});
      if (!isCancelled.current) {
        setComments(Object.values(_comments.content));
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

  return (
    <FlatList
      style={{backgroundColor: '#EEE'}}
      contentContainerStyle={{
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: '#EEE',
      }}
      ListEmptyComponent={PostPlaceHolderList}
      data={comments}
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
    backgroundColor: '#EEEEEE',
  },
});

export default React.memo(UserComment);
