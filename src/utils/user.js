export const getName = (about) => {
  if (about.profile && about.profile.name) {
    return about.profile.name;
  }
  return null;
};

export const getLocation = (about) => {
  if (about.profile && about.profile.location) {
    return about.profile.location;
  }
  return null;
};

export const getAvatar = (about) => {
  if (about.profile && about.profile.profile_image) {
    return about.profile.profile_image;
  }
  return null;
};

export const getCoverImage = (about) => {
  if (about.profile && about.profile.cover_image) {
    return about.profile.cover_image;
  }
  return null;
};

export const getWebsite = (about) => {
  if (about.profile && about.profile.website) {
    return about.profile.website;
  }
  return null;
};

export const getDescription = (about) => {
  if (about.profile && about.profile.about) {
    return about.profile.about;
  }
  return null;
};

export const getReputation = (input) => {
  if (input === 0) {
    return 25;
  }

  if (!input) {
    return input;
  }

  let neg = false;

  if (input < 0) {
    neg = true;
  }

  let reputationLevel = Math.log10(Math.abs(input));
  reputationLevel = Math.max(reputationLevel - 9, 0);

  if (reputationLevel < 0) {
    reputationLevel = 0;
  }

  if (neg) {
    reputationLevel *= -1;
  }

  reputationLevel = reputationLevel * 9 + 25;

  return Math.floor(reputationLevel);
};
