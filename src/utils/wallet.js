// export const groomingWalletData = async (user) => {
//   const walletData = {};

//   if (!user) {
//     return walletData;
//   }

//   // TODO: move them to utils these so big for a lifecycle function
//   walletData.rewardSteemBalance = parseToken(user.reward_steem_balance);
//   walletData.rewardSbdBalance = parseToken(user.reward_sbd_balance);
//   walletData.rewardVestingSteem = parseToken(user.reward_vesting_steem);
//   walletData.hasUnclaimedRewards =
//     walletData.rewardSteemBalance > 0 ||
//     walletData.rewardSbdBalance > 0 ||
//     walletData.rewardVestingSteem > 0;
//   walletData.balance = parseToken(user.balance);
//   walletData.vestingShares = parseToken(user.vesting_shares);
//   walletData.vestingSharesDelegated = parseToken(user.delegated_vesting_shares);
//   walletData.vestingSharesReceived = parseToken(user.received_vesting_shares);
//   walletData.vestingSharesTotal =
//     walletData.vestingShares -
//     walletData.vestingSharesDelegated +
//     walletData.vestingSharesReceived;
//   walletData.sbdBalance = parseToken(user.sbd_balance);
//   walletData.savingBalance = parseToken(user.savings_balance);
//   walletData.savingBalanceSbd = parseToken(user.savings_sbd_balance);

//   const feedHistory = await getFeedHistory();
//   const base = parseToken(feedHistory.current_median_history.base);
//   const quote = parseToken(feedHistory.current_median_history.quote);

//   walletData.steemPerMVests = globalProps.steemPerMVests;

//   const pricePerSteem = base / quote;

//   const totalSteem =
//     vestsToSp(walletData.vestingShares, walletData.steemPerMVests) +
//     walletData.balance +
//     walletData.savingBalance;

//   const totalSbd = walletData.sbdBalance + walletData.savingBalanceSbd;

//   walletData.estimatedValue = totalSteem * pricePerSteem + totalSbd;

//   const ppSbd = await getCurrencyTokenRate(userCurrency, 'hbd');
//   const ppSteem = await getCurrencyTokenRate(userCurrency, 'hive');

//   walletData.estimatedSteemValue =
//     (walletData.balance + walletData.savingBalance) * ppSteem;
//   walletData.estimatedSbdValue = totalSbd * ppSbd;
//   walletData.estimatedSpValue =
//     vestsToSp(walletData.vestingShares, walletData.steemPerMVests) * ppSteem;

//   walletData.showPowerDown =
//     user.next_vesting_withdrawal !== '1969-12-31T23:59:59';
//   const timeDiff = Math.abs(
//     parseDate(user.next_vesting_withdrawal) - new Date(),
//   );
//   walletData.nextVestingWithdrawal = Math.round(timeDiff / (1000 * 3600));

//   const {
//     transfer_history: transferHistory,
//     other_history: virtualHistory,
//   } = user;

//   const realHistory = transferHistory
//     ? transferHistory.slice(Math.max(transferHistory.length - 50, 0))
//     : [];
//   realHistory.push(...virtualHistory); //concat
//   realHistory.sort(compare); //sort desc

//   walletData.transactions = realHistory;

//   return walletData;
// };

function parseToken(strVal) {
  if (!strVal) {
    return 0;
  }

  return Number(parseFloat(strVal.split(' ')[0]));
}

function compare(a, b) {
  if (a[1].block < b[1].block) {
    return 1;
  }
  if (a[1].block > b[1].block) {
    return -1;
  }
  return 0;
}
