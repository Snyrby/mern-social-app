const createTokenUser = (user) => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    userId: user._id,
    role: user.role,
    location: user.location,
    occupation: user.occupation,
    viewedProfile: user.viewedProfile,
    picturePath: user.picturePath,
    impressions: user.impressions,
  };
};

module.exports = createTokenUser;
