import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

import {colors} from '../../utils/theme';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';

const screenWidth = Dimensions.get('window').width;

const CommentPlaceHolder = ({item}) => {
  return (
    <Placeholder style={styles.container} Animation={Fade}>
      <View style={styles.header}>
        <PlaceholderMedia style={styles.avatar} />
        <View style={styles.postMetadata}>
          <PlaceholderLine width={30} />
        </View>
      </View>
      <PlaceholderLine width={screenWidth * 0.2} />
      <PlaceholderLine width={screenWidth * 0.1} />
    </Placeholder>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  fromNow: {
    fontSize: 14,
    color: colors.dark_gray,
  },
  postMetadata: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  title: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  footer: {
    marginTop: 15,
    flexDirection: 'row',
  },
  payout: {
    fontSize: 18,
    lineHeight: 18,
    color: colors.dark_gray,
  },
  votes: {
    fontSize: 18,
    color: colors.dark_gray,
    lineHeight: 18,
  },
});

export default CommentPlaceHolder;
