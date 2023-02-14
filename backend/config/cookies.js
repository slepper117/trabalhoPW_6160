// Cookies Configuration
const cookiesConfig = {
  login: {
    httpOnly: true,
    sameSite:
      process.env.NODE_ENV === 'development'
        ? 'lax'
        : process.env.NODE_ENV === 'production' && 'none',
    secure:
      process.env.NODE_ENV === 'development'
        ? false
        : process.env.NODE_ENV === 'production' && true,
  },
  logout: {
    httpOnly: true,
    sameSite:
      process.env.NODE_ENV === 'development'
        ? 'lax'
        : process.env.NODE_ENV === 'production' && 'none',
    secure:
      process.env.NODE_ENV === 'development'
        ? false
        : process.env.NODE_ENV === 'production' && true,
    expires: new Date(0),
  },
};

export default cookiesConfig;
