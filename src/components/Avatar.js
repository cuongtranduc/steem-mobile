import React from 'react';
import FastImage from 'react-native-fast-image';

const Avatar = ({author, style, uri}) => {
  return (
    <FastImage
      source={{
        uri: uri || `https://avatars.esteem.app/u/${author}/avatar/small`,
        priority: FastImage.priority.high,
      }}
      resizeMode={FastImage.resizeMode.cover}
      style={style}
    />
  );
};

export default React.memo(Avatar);
