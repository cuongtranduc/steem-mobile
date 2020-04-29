export const sbdToDollar = (money) => {
  return `$${Number(money.replace(' SBD', '')).toFixed(2)}`;
};

export const vestToSteem = async (
  vestingShares,
  totalVestingShares,
  totalVestingFundSteem,
) => {
  (
    parseFloat(totalVestingFundSteem) *
    (parseFloat(vestingShares) / parseFloat(totalVestingShares))
  ).toFixed(0);
};
