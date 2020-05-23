import React from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';

import PostHeader from '../../components/PostHeader';
import PostFooter from '../../components/PostFooter';

import {colors} from '../../utils/theme';

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
      }}>
      <View
        style={{
          backgroundColor: '#F7F7F7',
          padding: 10,
          marginHorizontal: -15,
        }}>
        <Text style={{fontSize: 18, color: colors.dark_gray}}>
          {`All Comments (${comments.length})`}
        </Text>
      </View>
      <FlatList
        contentContainerStyle={{paddingBottom: 10}}
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
