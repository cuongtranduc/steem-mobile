import firestore from '@react-native-firebase/firestore';
import {store} from '../redux';

export const addPostToHistories = (post) => {
  const {username} = store.getState().storageReducer.account;
  return firestore()
    .collection('histories')
    .doc(username)
    .collection('posts')
    .doc(post.id.toString())
    .set({
      ...post,
      added_date: new Date(),
    });
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
    .set({
      ...post,
      added_date: new Date(),
    });
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

export const getBookmarks = (startAfter = null) => {
  const {username} = store.getState().storageReducer.account;
  return startAfter
    ? firestore()
        .collection('bookmarks')
        .doc(username)
        .collection('posts')
        .orderBy('added_date', 'desc')
        .startAfter(startAfter)
        .limit(5)
        .get()
    : firestore()
        .collection('bookmarks')
        .doc(username)
        .collection('posts')
        .orderBy('added_date', 'desc')
        .limit(5)
        .get();
};

export const getHistories = (startAfter = null) => {
  const {username} = store.getState().storageReducer.account;
  return startAfter
    ? firestore()
        .collection('histories')
        .doc(username)
        .collection('posts')
        .orderBy('added_date', 'desc')
        .startAfter(startAfter)
        .limit(5)
        .get()
    : firestore()
        .collection('histories')
        .doc(username)
        .collection('posts')
        .orderBy('added_date', 'desc')
        .limit(5)
        .get();
};
