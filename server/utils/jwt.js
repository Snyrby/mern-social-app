const jwt = require("jsonwebtoken");

const createJWT = ({ user }) => {
  // const oneWeek = 1000 * 60 * 60 * 24 * 7;
  const oneWeek = 1000 * 5;
  const token = jwt.sign({user}, process.env.JWT_SECRET, { expiresIn: oneWeek });
  return token;
};

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const oneMonth = 1000 * 60 * 60 * 24 * 30;
  const accessTokenJWT = createJWT({ payload: { user }, expires: oneDay });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
