import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import {getStatusBarHeight} from 'react-native-status-bar-height';

import Avatar from '../../components/Avatar';
import PostList from './PostList';

import {getUser} from '../../providers/dsteem';
import {longDateFormat} from '../../utils/time';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Profile = ({route, navigation}) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const {author} = route.params;
    const _user = await getUser(author);

    setUser(_user);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <FastImage
          source={
            user.coverImage
              ? {
                  uri: user.coverImage,
                  priority: FastImage.priority.high,
                }
              : require('../../assets/images/steem_cover.jpg')
          }
          resizeMode={FastImage.resizeMode.cover}
          style={styles.coverImage}
        />
        <View style={{padding: 15}}>
          <Avatar
            author={route.params.author}
            style={styles.avatar}
            // uri={user.avatar}
          />
          <Text style={styles.name}>{user.name}</Text>
          {user.description && (
            <Text style={styles.description}>{user.description}</Text>
          )}
          <View style={{marginTop: 10}}>
            {user.website && (
              <View style={[styles.locationContainer]}>
                <Icon name="link-variant" size={22} color="#333" />
                <Text style={styles.website}>{user.website}</Text>
              </View>
            )}
            {user.location && (
              <View style={[styles.locationContainer, {marginTop: 5}]}>
                <Icon name="map-marker" size={22} color="#333" />
                <Text style={styles.location}>{user.location}</Text>
              </View>
            )}
            <View style={[styles.locationContainer, {marginTop: 5}]}>
              <Icon name="calendar-range" size={22} color="#333" />
              <Text style={styles.location}>{`Joined ${longDateFormat(
                user.created,
              )}`}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                {user.following}
              </Text>
              <Text style={{fontSize: 16, color: '#555', marginLeft: 5}}>
                Following
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 30}}>
                {user.followers}
              </Text>
              <Text style={{fontSize: 16, color: '#555', marginLeft: 5}}>
                Followers
              </Text>
            </View>
          </View>
        </View>
        <PostList />
      </View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          left: 15,
          top: getStatusBarHeight() + 5,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: 15,
        }}>
        <Icon
          name="keyboard-backspace"
          size={24}
          color="#fff"
          style={{
            borderRadius: 12,
            padding: 3,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  coverImage: {
    height: screenHeight / 6,
    width: '100%',
    backgroundColor: 'gray',
  },
  avatar: {
    marginTop: -(screenWidth / 10 + 15),
    borderWidth: 3,
    borderColor: '#fff',
    height: screenWidth / 5,
    width: screenWidth / 5,
    borderRadius: screenWidth / 10,
  },
  name: {
    fontSize: 24,
    letterSpacing: 1,
    color: '#555',
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    marginLeft: 5,
    fontSize: 16,
    lineHeight: 22,
    color: '#555',
  },
  website: {
    marginLeft: 5,
    fontSize: 16,
    lineHeight: 22,
    color: 'rgb(27, 149, 224)',
  },
});

export default Profile;
