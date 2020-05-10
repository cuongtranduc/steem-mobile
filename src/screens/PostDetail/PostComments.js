import React from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';

import CommentPlaceHolderList from '../../components/CommentPlaceHolderList';
import PostHeader from '../../components/PostHeader';
import PostFooter from '../../components/PostFooter';

const Comment = ({comment}) => {
  return (
    <View
      style={{
        paddingVertical: 10,
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
      <Text style={{marginTop: 10, fontSize: 16}}>{comment.body}</Text>
      <PostFooter item={comment} hideShare />
    </View>
  );
};

const PostComments = ({comments}) => {
  const _renderItem = ({item}) => {
    return <Comment comment={item} />;
  };

  return (
    <View
      style={{
        flex: 1,
        marginVertical: 10,
      }}>
      <FlatList
        ListEmptyComponent={CommentPlaceHolderList}
        data={comments}
        renderItem={_renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemSeperator: {},
});

export default React.memo(PostComments);
