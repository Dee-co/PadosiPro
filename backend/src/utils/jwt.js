import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

const getAccessSecret = () => {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error('JWT_ACCESS_SECRET is not configured');
  }

  return process.env.JWT_ACCESS_SECRET;
};

const getRefreshSecret = () => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET is not configured');
  }

  return process.env.JWT_REFRESH_SECRET;
};

export const generateAccessToken = user => {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      type: 'access',
    },
    getAccessSecret(),
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    }
  );
};

export const generateRefreshToken = user => {
  return jwt.sign(
    {
      userId: user.id,
      type: 'refresh',
    },
    getRefreshSecret(),
    {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    }
  );
};

export const verifyAccessToken = token => {
  return jwt.verify(token, getAccessSecret());
};

export const verifyRefreshToken = token => {
  return jwt.verify(token, getRefreshSecret());
};