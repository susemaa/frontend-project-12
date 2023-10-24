const apiPath = 'api/v1';

export default {
  signup: () => [apiPath, 'signup'].join('/'),
  login: () => [apiPath, 'login'].join('/'),
  data: () => [apiPath, 'data'].join('/'),
  loginPage: () => '/login',
  signupPage: () => '/signup',
  mainPage: () => '/',
  unknownPath: () => '*',
};
