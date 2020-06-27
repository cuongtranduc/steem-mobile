import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {isEmpty} from 'lodash';

import Input from '../../components/Input';

import {colors} from '../../utils/theme';

import {login} from '../../redux/accountReducer/operations';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SIGNUP_URL = 'https://signup.steemit.com/';

const Account = ({navigation}) => {
  const dispacth = useDispatch();
  const [isRemember, setIsRemember] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {isLoading} = useSelector((state) => state.accountReducer);
  const {account} = useSelector((state) => state.accountReducer);

  useEffect(() => {
    if (!isEmpty(account)) {
      navigation.navigate('Home', {login: true});
    }
  }, [account, navigation]);

  const _onSetRememberMe = () => {
    setIsRemember(!isRemember);
  };

  const _login = async () => {
    dispacth(login({username, password, isRemember}));
  };

  const isLoginDisabled = useCallback(() => {
    return username === '' || password === '' || isLoading;
  }, [username, password, isLoading]);

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
          autoCapitalize="none"
          value={username}
          onValueChange={(value) => setUsername(value)}
          icon="account-circle"
        />
        <Input
          autoCapitalize="none"
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
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.closeIcon}>
        <Icon name="close" size={30} />
      </TouchableOpacity>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
        />
      )}
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
