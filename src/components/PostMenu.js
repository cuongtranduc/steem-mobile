import React from 'react';
import {View, Text, StyleSheet, Clipboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const PostMenu = ({item}) => {
  const _copyLink = () => {
    Clipboard.setString(`https://steemit.com${item.url}`);
  };

  return (
    <View>
      <Menu>
        <MenuTrigger>
          <Icon name="dots-vertical" color="#333" size={20} />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={_copyLink}>
            <View style={styles.item}>
              <Icon name="link" size={18} />
              <Text style={styles.text}>Copy Link</Text>
            </View>
          </MenuOption>
          <MenuOption>
            <View style={styles.item}>
              <Icon name="share-variant" size={18} />
              <Text style={styles.text}>Share</Text>
            </View>
          </MenuOption>
          <MenuOption>
            <View style={styles.item}>
              <Icon name="bookmark" size={18} />
              <Text style={styles.text}>Add to Bookmark</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  text: {
    fontSize: 14,
    lineHeight: 14,
    marginLeft: 10,
  },
});

export default React.memo(PostMenu);
