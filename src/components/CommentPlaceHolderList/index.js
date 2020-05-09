import React from 'react';
import {ScrollView, View} from 'react-native';

import CommentPlaceHolder from './CommentPlaceHolder';

const CommentPlaceHolderList = () => {
  return (
    <ScrollView>
      {new Array(5).fill(null).map((item, index) => {
        return (
          <View key={index} style={{marginBottom: 10}}>
            <CommentPlaceHolder />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default CommentPlaceHolderList;
