import React from 'react';
import {View, Dimensions} from 'react-native';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const PostDetailPlaceHolder = () => (
  <View style={{flex: 1}}>
    <Placeholder Animation={Fade}>
      <PlaceholderLine />
      <PlaceholderLine width={WIDTH * 0.1} />
      <PlaceholderMedia style={{width: WIDTH - 30, height: HEIGHT / 5}} />
      <PlaceholderLine />
      <PlaceholderLine />
      <PlaceholderLine width={WIDTH * 0.2} />
      <PlaceholderLine />
      <PlaceholderLine width={WIDTH * 0.2} />
      <PlaceholderLine width={WIDTH * 0.1} />
      <PlaceholderLine />
      <PlaceholderLine width={WIDTH * 0.2} />
    </Placeholder>
  </View>
);

export default PostDetailPlaceHolder;
