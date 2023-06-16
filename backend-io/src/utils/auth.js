export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const isValidToken = !!token;
  return isValidToken;
};
