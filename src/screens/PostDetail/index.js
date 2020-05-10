import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, Animated, View} from 'react-native';
import {
  useCollapsibleStack,
  CollapsibleStackSub,
} from 'react-navigation-collapsible';

import PostDetailPlaceHolder from './PostDetailPlaceHolder';
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostFooter from './PostFooter';
import PostComments from './PostComments';

import client from '../../providers/dsteem';

const PostDetail = ({route, navigation}) => {
  const {
    onScroll,
    scrollIndicatorInsetTop,
    containerPaddingTop,
  } = useCollapsibleStack();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const {data} = route.params;
    client.database.call('get_content', data).then((result) => {
      setPost(result);
      setIsLoading(false);
    });
    client.database.call('get_content_replies', data).then((result) => {
      console.log(result);
      setComments(result);
    });
  }, [route.params]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1}}>
        <Animated.ScrollView
          contentContainerStyle={{paddingTop: containerPaddingTop}}
          scrollIndicatorInsets={{top: scrollIndicatorInsetTop}}
          onScroll={onScroll}
          style={styles.container}>
          <PostHeader post={route.params.post} />
          {isLoading ? (
            <PostDetailPlaceHolder />
          ) : (
            post.body && <PostBody html={post.body} />
          )}
          <PostComments comments={comments} />
        </Animated.ScrollView>
        <View style={{position: 'absolute', bottom: 0}}>
          {!isLoading && <PostFooter item={post} />}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
});

export default PostDetail;
