import { Client } from 'dsteem';
import { get, has } from 'lodash';
import { 
  getName, 
  getAvatar, 
  getReputation, 
  getLocation, 
  getCoverImage,
  getWebsite,
  getDescription
 } from '../utils/user';

const client = new Client('https://api.steemit.com');

export function getPosts({tag, limit, category}) {
  return client.database.getDiscussions(category, {tag, limit, truncate_body: 1 });
}

export async function getUser(user) {
  try {
    const [account, follows] = await Promise.all([
      client.database.getAccounts([user]), 
      client.database.call('get_follow_count', [user])
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

    if (has(_account, 'posting_json_metadata') || has(_account, 'json_metadata')) {
      try {
        _account.about =
          JSON.parse(get(_account, 'posting_json_metadata')) ||
          JSON.parse(get(_account, 'json_metadata'));
      } catch (e) {
        _account.about = {};
      }
    }

    _account.avatar = getAvatar(get(_account, 'about'));
    _account.coverImage = getCoverImage(get(_account, 'about'));
    _account.location = getLocation(get(_account, 'about'));
    _account.display_name = getName(get(_account, 'about'));
    _account.website = getWebsite(get(_account, 'about'));
    _account.description = getDescription(get(_account, 'about'));
    _account.description111111 = 'dsdsdsd';
    _account.following = follows.following_count;
    _account.followers = follows.follower_count;

    console.log('_account', _account);

    return _account;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const vestToSteem = async (vestingShares, totalVestingShares, totalVestingFundSteem) =>
  (
    parseFloat(totalVestingFundSteem) *
    (parseFloat(vestingShares) / parseFloat(totalVestingShares))
  ).toFixed(0);

export default client;