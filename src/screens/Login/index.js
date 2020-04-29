import React, {useState, useCallback, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import Input from '../../components/Input';

import {goBack} from '../../navigation';
import {colors} from '../../utils/theme';

import {login} from '../../redux/accountReducer/operations';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SIGNUP_URL = 'https://signup.steemit.com/';

const Account = () => {
  const dispacth = useDispatch();
  const [isRemember, setIsRemember] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const _onSetRememberMe = () => {
    setIsRemember(!isRemember);
  };

  const _login = () => {
    dispacth(login({username, password}));
  };

  const isLoginDisabled = useCallback(() => {
    return username === '' || password === '';
  }, [username, password]);

  return (
    <View style={{flex: 1}}>
      <View behavior="height" style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/steem_logo.webp')}
        />
        <View style={{alignSelf: 'flex-start'}}>
          <Text style={styles.welcomeText}>Welcome Back,</Text>
          <Text style={styles.signInText}>Sign in to access more content</Text>
        </View>
        <Input
          value={username}
          onValueChange={(value) => setUsername(value)}
          icon="account-circle"
        />
        <Input
          isPassword={true}
          value={password}
          onValueChange={(value) => setPassword(value)}
          icon="lock-question"
        />
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
        <TouchableOpacity
          onPress={_login}
          disabled={isLoginDisabled()}
          style={[styles.loginButton, {opacity: isLoginDisabled() ? 0.5 : 1}]}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <View style={styles.signUpContainer}>
          <Text style={styles.rememberMeText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => Linking.openURL(SIGNUP_URL)}>
            <Text style={styles.signUpText}> Signup here</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => goBack()} style={styles.closeIcon}>
        <Icon name="close" size={30} />
      </TouchableOpacity>
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
  closeIcon: {position: 'absolute', top: getStatusBarHeight(), left: 15},
});

export default Account;