import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import PostHeader from '../../components/PostHeader';

const PostDetailHeader = ({post}) => {
  return (
    <View>
      <PostHeader item={post} />
      <Text style={styles.title}>{post.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginVertical: 15,
    fontSize: 22,
    fontWeight: 'bold',
  },
  avatar: {
    marginTop: 15,
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});

export default PostDetailHeader;
