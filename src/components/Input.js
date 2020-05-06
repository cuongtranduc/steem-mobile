import React, {useState, createRef} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors} from '../utils/theme';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Input = ({icon, value, onValueChange, isPassword, autoCapitalize}) => {
  const inputUserRef = createRef();
  const [color, setColor] = useState('#666');

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.inputContainer,
        {borderBottomColor: color === '#666' ? 'rgba(0, 0, 0, 0.4)' : color},
      ]}
      onPress={() => inputUserRef.current.focus()}>
      <Icon name={icon} size={25} color={color} />
      <TextInput
        value={value}
        onChangeText={onValueChange}
        ref={inputUserRef}
        style={styles.input}
        onFocus={() => setColor(colors.primary)}
        onBlur={() => setColor('#666')}
        selectionColor={colors.primary}
        secureTextEntry={isPassword}
        autoCapitalize={autoCapitalize}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: screenHeight * 0.08,
    borderBottomWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
  },
});

export default React.memo(Input);
