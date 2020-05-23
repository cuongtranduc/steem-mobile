import firestore from '@react-native-firebase/firestore';
import {store} from '../redux';

export const addPostToHistories = (post) => {
  const {username} = store.getState().storageReducer.account;
  return firestore()
    .collection('histories')
    .doc(username)
    .collection('posts')
    .doc(post.id.toString())
    .set(post);
};

export const getPostFromBookmarks = (post) => {
  const {username} = store.getState().storageReducer.account;
  return firestore()
    .collection('bookmarks')
    .doc(username)
    .collection('posts')
    .doc(post.id.toString())
    .get();
};

export const bookmark = (post) => {
  const {username} = store.getState().storageReducer.account;
  return firestore()
    .collection('bookmarks')
    .doc(username)
    .collection('posts')
    .doc(post.id.toString())
    .set(post);
};

export const unBookmark = (post) => {
  const {username} = store.getState().storageReducer.account;
  return firestore()
    .collection('bookmarks')
    .doc(username)
    .collection('posts')
    .doc(post.id.toString())
    .delete();
};
