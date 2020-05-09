import React, {useEffect, useState, useCallback} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Avatar from '../../components/Avatar';
import {getUser} from '../../providers/dsteem';
import {longDateFormat} from '../../utils/time';
import ContentTabView from './ContentTabView';
import UserWallet from './UserWallet';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Profile = ({route, navigation}) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const getUserInfo = useCallback(async () => {
    const {author} = route.params;
    const _user = await getUser(author);
    console.log('user', _user);
    setUser(_user);
    setIsLoading(false);
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <View style={styles.coverContainer}>
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
        </View>
        <View style={{padding: 15}}>
          <Avatar
            author={route.params.author}
            style={styles.avatar}
            uri={user.avatar}
          />
          <Text style={styles.name}>{route.params.author}</Text>
          {user.description && (
            <Text style={styles.description}>{user.description}</Text>
          )}
          <View style={{marginTop: 10}}>
            <View style={[styles.locationContainer, {marginTop: 5}]}>
              <Icon name="calendar-range" size={22} color="#333" />
              <Text style={styles.joinedDate}>{`Member since ${longDateFormat(
                user.created,
              )}`}</Text>
            </View>
            {user.location && (
              <View style={[styles.locationContainer, {marginTop: 5}]}>
                <Icon name="map-marker" size={22} color="#333" />
                <Text style={styles.location}>{user.location}</Text>
              </View>
            )}
            {user.website && (
              <View style={[styles.locationContainer]}>
                <Icon name="link-variant" size={22} color="#333" />
                <Text style={styles.website}>{user.website}</Text>
              </View>
            )}
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
        <ContentTabView user={user} author={user.name} />
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
  coverContainer: {
    shadowColor: 'gray',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 5,
  },
  avatar: {
    marginTop: -(screenWidth / 10 + 15),
    borderWidth: 3,
    borderColor: '#EEE',
    height: screenWidth / 5,
    width: screenWidth / 5,
    borderRadius: screenWidth / 10,
  },
  name: {
    fontSize: 24,
    letterSpacing: 1,
    color: '#000',
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
  joinedDate: {
    marginLeft: 5,
    fontSize: 16,
    lineHeight: 22,
    color: '#278C73',
  },
  website: {
    marginLeft: 5,
    fontSize: 16,
    lineHeight: 22,
    color: 'rgb(27, 149, 224)',
  },
});

export default Profile;
