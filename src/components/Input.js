import React, {useState, createRef} from 'react';
import {TouchableOpacity, StyleSheet, TextInput, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Input = ({icon, value, onValueChange}) => {
  const inputUserRef = createRef();
  const [color, setColor] = useState('#666');

  return (
    <TouchableOpacity
      style={[styles.inputContainer, {borderBottomColor: color === "#666" ? 'rgba(0, 0, 0, 0.3)' : color}]}
      onPress={() => inputUserRef.current.focus()}>
      <Icon name={icon} size={25} color={color} />
      <TextInput
        value={value}
        onChangeText={onValueChange}
        ref={inputUserRef}
        style={styles.input}
        onFocus={() => setColor('#28D8A1')}
        onBlur={() => setColor("#555")}
        selectionColor={'#28D8A1'}
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
    borderBottomWidth: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    marginLeft: 15,
    fontSize: 16,
  },
});

export default React.memo(Input);
