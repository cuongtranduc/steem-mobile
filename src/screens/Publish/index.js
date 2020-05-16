import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  TextInput,
  StyleSheet,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EStyleSheet from 'react-native-extended-stylesheet';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {colors} from '../../utils/theme';

const initHTML = `
`;

const Publish = ({navigation}) => {
  const richText = useRef(null);

  useEffect(() => {
    richText.current?.focusContentEditor();
  }, [richText]);

  return (
    <>
      <SafeAreaView style={{flex: 0, backgroundColor: '#fff'}}>
        <StatusBar barStyle="dark-content" />
      </SafeAreaView>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="close" size={30} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.publishText}>Publish</Text>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor: colors.white, paddingVertical: 15}}>
          <TextInput
            placeholder="Title"
            placeholderTextColor={'#AAA'}
            style={[styles.input, {fontWeight: 'bold'}]}
          />
          <TextInput
            placeholder="Tags (separate with space)"
            placeholderTextColor={'#AAA'}
            style={[styles.input, {fontSize: 24}]}
          />
        </View>
        <RichEditor
          style={{flex: 1}}
          initialContentHTML={initHTML}
          ref={richText}
        />
        <View>
          <RichToolbar
            selectedIconTint="#fff"
            selectedButtonStyle={{backgroundColor: colors.primary}}
            style={{backgroundColor: colors.exlight_gray}}
            getEditor={() => richText.current}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.exlight_gray,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  publishText: {
    marginTop: 1,
    fontSize: 24,
    lineHeight: 33,
    color: '#2095F2',
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.exlight_gray,
    marginHorizontal: 15,
    fontSize: 28,
    letterSpacing: 1.5,
    padding: 5,
    paddingVertical: 15,
  },
});

export default Publish;
