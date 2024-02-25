export const isBrowser = () => typeof window !== 'undefined';

export const getUser = () =>
  isBrowser() && window.localStorage.getItem('user')
    ? JSON.parse(window.localStorage.getItem('user'))
    : {};
export const getUserInfo = () =>
  isBrowser() && window.localStorage.getItem('userinfo')
    ? JSON.parse(window.localStorage.getItem('userinfo'))
    : {};

const setUser = (user) => {
  window.localStorage.setItem('user', JSON.stringify(user));
};

export const isLoggedIn = () => {
  const user = getUser();
  return !!user.access_token;
};

export const getUserTokens = () => {
  const user = getUser();
  return user;
};

export const logout = (callback) => {
  setUser({});
  callback();
};

export function getRemainingSecondsUntilExpiry(token) {
  const tokenPayload = JSON.parse(atob(token.split('.')[1]));
  const expirationTime = tokenPayload.exp;
  const currentTime = Math.floor(Date.now() / 1000);
  const remainingSeconds = expirationTime - currentTime;
  return remainingSeconds;
}
