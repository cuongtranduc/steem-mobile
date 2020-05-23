import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {colors} from '../utils/theme';

const AnimatedAlert = forwardRef((props, ref) => {
  const [fadeIn] = useState(new Animated.Value(1));
  const [message, setMessage] = useState('');
  const [isHide, setIsHide] = useState(true);

  useImperativeHandle(ref, () => ({
    show(_message) {
      setMessage(_message);
      setIsHide(false);
      fadeOut();
    },
  }));

  const fadeOut = () => {
    Animated.timing(fadeIn, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      setIsHide(true);
    });
  };

  return isHide ? null : (
    <Animated.View style={[styles.container, {opacity: fadeIn}]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.exexlight_gray,
    position: 'absolute',
    bottom: 100,
    paddingVertical: 15,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 50,
  },
  text: {
    fontSize: 16,
  },
});

export default React.memo(AnimatedAlert);
