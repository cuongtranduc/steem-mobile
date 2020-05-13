import {Client, PrivateKey} from 'dsteem';
import {get, has} from 'lodash';
import {AUTH_TYPE} from '../utils/constants';
import {vestToSteem} from '../utils/money';
import {
  getAvatar,
  getCoverImage,
  getDescription,
  getLocation,
  getName,
  getReputation,
  getWebsite,
} from '../utils/user';
import {encryptKey} from '../utils/crypto';

const client = new Client('https://api.steemit.com');

export function getPosts({tag, limit = 5, category = 'created'}) {
  return client.database.getDiscussions(category, {
    tag,
    limit,
    truncate_body: 1,
  });
}

export function getUserPosts(query) {
  return client.database.getDiscussions('blog', {
    limit: 5,
    truncate_body: 1,
    ...query,
  });
}

export function getUserComments(query) {
  return client.database.getDiscussions('comments', {
    limit: 10,
    ...query,
  });
}

export function submitVote(author, permlink) {
  const vote = {
    author,
    permlink,
    voter: 1,
    weight: 5000,
  };

  client.broadcast.vote(vote, privateKey).then(
    function (result) {
      console.log('success:', result);
    },
    function (error) {},
  );
}

export async function getUser(user) {
  try {
    const [account, follows] = await Promise.all([
      client.database.getAccounts([user]),
      client.database.call('get_follow_count', [user]),
    ]);
    const _account = {
      ...account[0],
    };
    let unreadActivityCount;

    if (account && account.length < 1) {
      return null;
    }

    const globalProperties = await client.database.getDynamicGlobalProperties();
    const rcPower =
      user &&
      (await client.call('rc_api', 'find_rc_accounts', {
        accounts: [user],
      }));
    try {
      // unreadActivityCount = await getUnreadActivityCount({
      //   user,
      // });
    } catch (error) {
      unreadActivityCount = 0;
    }

    _account.reputation = getReputation(_account.reputation);
    _account.username = _account.name;
    _account.unread_activity_count = unreadActivityCount;
    _account.rc_manabar = rcPower.rc_accounts[0].rc_manabar;
    _account.steem_power = await vestToSteem(
      _account.vesting_shares,
      globalProperties.total_vesting_shares,
      globalProperties.total_vesting_fund_steem,
    );
    _account.received_steem_power = await vestToSteem(
      get(_account, 'received_vesting_shares'),
      get(globalProperties, 'total_vesting_shares'),
      get(globalProperties, 'total_vesting_fund_steem'),
    );
    _account.delegated_steem_power = await vestToSteem(
      get(_account, 'delegated_vesting_shares'),
      get(globalProperties, 'total_vesting_shares'),
      get(globalProperties, 'total_vesting_fund_steem'),
    );

    if (
      has(_account, 'posting_json_metadata') ||
      has(_account, 'json_metadata')
    ) {
      try {
        _account.about =
          get(_account, 'posting_json_metadata') !== ''
            ? JSON.parse(get(_account, 'posting_json_metadata'))
            : JSON.parse(get(_account, 'json_metadata'));
      } catch (e) {
        _account.about = {};
      }
    }

    _account.avatar = getAvatar(_account.about);
    _account.coverImage = getCoverImage(_account.about);
    _account.location = getLocation(_account.about);
    _account.display_name = getName(_account.about);
    _account.website = getWebsite(_account.about);
    _account.description = getDescription(_account.about);
    _account.following = follows.following_count;
    _account.followers = follows.follower_count;

    return _account;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function login(username, password, keyrole) {
  try {
    let loginFlag = false;
    let avatar = '';
    let authType = '';

    // Get user account data from STEEM Blockchain
    const account = await getUser(username);

    if (!account) {
      return Promise.reject(new Error('auth.invalid_username'));
    }

    // Public keys of user
    const publicKeys = {
      activeKey: get(account, 'active.key_auths', []).map((x) => x[0])[0],
      memoKey: get(account, 'memo_key', ''),
      ownerKey: get(account, 'owner.key_auths', []).map((x) => x[0])[0],
      postingKey: get(account, 'posting.key_auths', []).map((x) => x[0])[0],
    };

    // Set private keys of user
    const privateKeys = getPrivateKeys(username, password);

    // Check all keys
    Object.keys(publicKeys).map((pubKey) => {
      if (
        publicKeys[pubKey] === privateKeys[pubKey].createPublic().toString()
      ) {
        loginFlag = true;
        if (privateKeys.isMasterKey) {
          authType = AUTH_TYPE.MASTER_KEY;
        } else {
          authType = pubKey;
        }
      }
    });

    let jsonMetadata;
    try {
      jsonMetadata =
        JSON.parse(account.posting_json_metadata) ||
        JSON.parse(account.json_metadata) ||
        '';
    } catch (err) {
      jsonMetadata = '';
    }
    if (Object.keys(jsonMetadata).length !== 0) {
      avatar = jsonMetadata.profile.profile_image || '';
    }
    if (loginFlag) {
      const userData = {
        username,
        avatar,
        authType,
        masterKey: '',
        postingKey: '',
        activeKey: '',
        memoKey: '',
        accessToken: '',
      };

      // if (isPinCodeOpen) {
      //   account.local = userData;
      // } else {
      //   const resData = {
      //     pinCode: Config.DEFAULT_PIN,
      //     password,
      //   };
      const resData = {
        pinCode: '1111',
        password,
      };
      const updatedUserData = await getUpdatedUserData(userData, resData);

      //   account.local = updatedUserData;
      //   account.local.avatar = avatar;
      // }

      // const authData = {
      //   isLoggedIn: true,
      //   currentUsername: username,
      // };
      // await setAuthStatus(authData);

      // // Save user data to Realm DB
      // await setUserData(account.local);
      // await updateCurrentUsername(account.name);
      return {
        ...updatedUserData,
        ...account,
        password,
      };
    }
    return Promise.reject(new Error('auth.invalid_credentials'));
  } catch (err) {
    console.log('err', err);
    return Promise.reject(new Error('auth.invalid_credentials'));
  }
}

export const getUpdatedUserData = (userData, data) => {
  try {
    const privateKeys = getPrivateKeys(
      get(userData, 'username', ''),
      get(data, 'password'),
    );

    return {
      username: get(userData, 'username', ''),
      authType: get(userData, 'authType', ''),
      accessToken:
        get(userData, 'authType', '') === AUTH_TYPE.STEEM_CONNECT
          ? encryptKey(data.accessToken, get(data, 'pinCode'))
          : '',
      masterKey:
        get(userData, 'authType', '') === AUTH_TYPE.MASTER_KEY
          ? encryptKey(data.password, get(data, 'pinCode'))
          : '',
      postingKey:
        get(userData, 'authType', '') === AUTH_TYPE.MASTER_KEY ||
        get(userData, 'authType', '') === AUTH_TYPE.POSTING_KEY
          ? encryptKey(
              get(privateKeys, 'postingKey', '').toString(),
              get(data, 'pinCode'),
            )
          : '',
      activeKey:
        get(userData, 'authType', '') === AUTH_TYPE.MASTER_KEY ||
        get(userData, 'authType', '') === AUTH_TYPE.ACTIVE_KEY
          ? encryptKey(
              get(privateKeys, 'activeKey', '').toString(),
              get(data, 'pinCode'),
            )
          : '',
      memoKey:
        get(userData, 'authType', '') === AUTH_TYPE.MASTER_KEY ||
        get(userData, 'authType', '') === AUTH_TYPE.MEMO_KEY
          ? encryptKey(
              get(privateKeys, 'memoKey', '').toString(),
              get(data, 'pinCode'),
            )
          : '',
    };
  } catch (err) {
    console.log(err);
    return {};
  }
};

const getPrivateKeys = (username, password) => {
  try {
    return {
      activeKey: PrivateKey.from(password),
      memoKey: PrivateKey.from(password),
      ownerKey: PrivateKey.from(password),
      postingKey: PrivateKey.from(password),
      isMasterKey: false,
    };
  } catch (e) {
    return {
      activeKey: PrivateKey.fromLogin(username, password, 'active'),
      memoKey: PrivateKey.fromLogin(username, password, 'memo'),
      ownerKey: PrivateKey.fromLogin(username, password, 'owner'),
      postingKey: PrivateKey.fromLogin(username, password, 'posting'),
      isMasterKey: true,
    };
  }
};

export default client;
