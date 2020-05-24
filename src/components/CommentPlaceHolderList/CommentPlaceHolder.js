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
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  postMetadata: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'center',
  },
});

export default CommentPlaceHolder;
