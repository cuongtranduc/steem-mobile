import React from 'react';
import {ScrollView, View} from 'react-native';

import PostPlaceHolder from './PostPlaceHolder';

const PostPlaceHolderList = () => {
  return (
    <ScrollView>
      {new Array(5).fill(null).map((item, index) => {
        return (
          <View key={index} style={{marginBottom: 10}}>
            <PostPlaceHolder />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default PostPlaceHolderList;
