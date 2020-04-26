import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Input from '../../components/Input';

import { colors } from '../../utils/theme';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SIGNUP_URL = 'https://signup.steemit.com/';

const Account = () => {
  const [isRemember, setIsRemember] = useState(false);

  const _onSetRememberMe = () => {
    setIsRemember(!isRemember);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/steem_logo.webp')}
      />
      <View style={{alignSelf: 'flex-start'}}>
        <Text style={styles.welcomeText}>Welcome Back,</Text>
        <Text style={styles.signInText}>Sign in to access more content</Text>
      </View>
      <Input icon="account-circle" />
      <Input icon="lock-question" />
      <TouchableOpacity style={styles.rememberMe} onPress={_onSetRememberMe}>
        <Icon
          size={25}
          color={isRemember ? colors.primary : '#666'}
          name={
            isRemember
              ? 'checkbox-marked-circle'
              : 'checkbox-blank-circle-outline'
          }
        />
        <Text style={styles.rememberMeText}>Remember me</Text>
      </TouchableOpacity>
      <View style={styles.loginButton}>
        <Text style={styles.loginText}>LOGIN</Text>
      </View>
      <View style={styles.signUpContainer}>
        <Text style={styles.rememberMeText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => Linking.openURL(SIGNUP_URL)}>
          <Text style={styles.signUpText}> Signup here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.1,
    backgroundColor: '#fff',
  },
  logo: {
    height: screenWidth / 3,
    width: screenWidth / 3,
  },
  inputContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    alignSelf: 'stretch',
    height: screenHeight * 0.08,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomWidth: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: colors.primary,
    width: screenWidth * 0.8,
    height: screenHeight * 0.06,
    borderRadius: screenHeight * 0.03,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rememberMe: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  rememberMeText: {
    lineHeight: 25,
    marginLeft: 15,
    fontSize: 18,
    color: '#333',
  },
  signUpContainer: {
    marginTop: 30,
    flexDirection: 'row',
  },
  signUpText: {
    fontSize: 18,
    color: colors.primary,
  },
  input: {
    marginLeft: 15,
    fontSize: 16,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  signInText: {fontSize: 18, color: '#333'},
});

export default Account;
