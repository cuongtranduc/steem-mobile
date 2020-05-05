import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import PostHeader from '../../components/PostHeader';

const PostDetailHeader = ({post}) => {
  console.log('post', post);
  return (
    <View style={{marginBottom: 15}}>
      {post.title && <Text style={styles.title}>{post.title}</Text>}
      <PostHeader item={post} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 15,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default PostDetailHeader;
