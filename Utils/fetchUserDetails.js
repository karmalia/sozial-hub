export const getAccessToken = () => {
  const accessToken =
    localStorage.getItem('accessToken') !== 'undefined'
      ? JSON.parse(localStorage.getItem('accessToken'))
      : localStorage.clear();

  return accessToken;
};

export const fetchUser = () => {
  const accessToken =
    localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : localStorage.clear();

  return accessToken;
};
