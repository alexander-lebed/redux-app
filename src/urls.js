import environment from './helpers/environment';

export const API_URL = environment.getApiUrl();
export const USERS_URL = API_URL + '/users';
export const CONVERSATIONS_URL = API_URL + '/conversations';