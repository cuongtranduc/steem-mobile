import React, {useEffect, useState, useCallback} from 'react';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {StyleSheet, SafeAreaView, Animated, View} from 'react-native';
import PostDetailPlaceHolder from './PostDetailPlaceHolder';
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostFooter from './PostFooter';
import PostComments from './PostComments';
import PostMenu from './PostMenu';

import client from '../../providers/dsteem';

const PostDetail = ({route, navigation}) => {
  const {username} = useSelector((state) => state.storageReducer.account);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVoted, setIsVoted] = useState(false);

  useEffect(() => {
    checkVoted();
    getComments();
    getPost();
  }, [checkVoted, getComments, getPost]);

  const addPostToFirebase = useCallback(
    (_post) => {
      firestore()
        .collection('histories')
        .doc(username)
        .collection('posts')
        .doc(_post.id.toString())
        .set(_post)
        .then(() => {
          console.log('Post added!');
        })
        .catch((error) => {
          console.log('error', error);
        });
    },
    [username],
  );

  const getComments = useCallback(() => {
    const {data} = route.params;
    client.database.call('get_content_replies', data).then((result) => {
      setComments(result);
    });
  }, [route.params]);

  const getPost = useCallback(() => {
    const {data} = route.params;
    client.database.call('get_content', data).then((result) => {
      setPost(result);
      addPostToFirebase(result);
      setIsLoading(false);
    });
  }, [addPostToFirebase, route.params]);

  const checkVoted = useCallback(
    (activeVotes) => {
      const _activeVotes = activeVotes || route.params.activeVotes;
      const _isVoted = _activeVotes.some((vote) => vote.voter === username);
      setIsVoted(_isVoted);
    },
    [route.params, username],
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1}}>
        <Animated.ScrollView style={styles.container}>
          <PostHeader post={route.params.post} />
          {isLoading ? (
            <PostDetailPlaceHolder />
          ) : (
            post.body && (
              <View>
                <PostBody html={post.body} />
                <PostFooter
                  isVoted={isVoted}
                  item={post}
                  activeVotes={route.params.activeVotes}
                />
              </View>
            )
          )}
          {!isLoading && <PostComments comments={comments} />}
        </Animated.ScrollView>
        <PostMenu
          post={post}
          isVoted={isVoted}
          checkVoted={checkVoted}
          getActiveVotes={route.params.getActiveVotes}
        />
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
