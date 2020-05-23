import React, {useEffect, useState, useCallback, useRef} from 'react';
import {useSelector} from 'react-redux';
import {StyleSheet, SafeAreaView, Animated, View} from 'react-native';
import PostDetailPlaceHolder from './PostDetailPlaceHolder';
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostFooter from './PostFooter';
import PostComments from './PostComments';
import PostMenu from './PostMenu';
import AnimatedAlert from '../../components/AnimatedAlert';

import client from '../../providers/dsteem';
import {addPostToHistories} from '../../providers/firebase';

const PostDetail = ({route, navigation}) => {
  const {username} = useSelector((state) => state.storageReducer.account);
  const alertRef = useRef();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVoted, setIsVoted] = useState(false);

  useEffect(() => {
    checkVoted();
    getComments();
    getPost();
  }, [checkVoted, getComments, getPost]);

  const addPostToFirebase = useCallback(async (_post) => {
    try {
      await addPostToHistories(_post);
    } catch (error) {
      console.log('error', error);
    }
  }, []);

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

  const showAlert = (message) => {
    alertRef.current.show(message);
  };

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
          showAlert={showAlert}
        />
        <AnimatedAlert ref={alertRef} />
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
