
export const DOCUMENT_TITLE = 'WTalk';

export const USERS_URL = process.env.API_HOST + '/users';
export const CONVERSATIONS_URL = process.env.API_HOST + '/conversations';

export const adminEmail = 'alexanderlebed999@gmail.com';

export const MAIN_COLOR = '#28a745'; // '#00b386';
export const ONLINE_STYLE = {boxShadow: `0px 0px 0pt 2pt ${MAIN_COLOR}`};

export const IMGUR_CLIENT_ID = '602dc858c112d77';
export const IMGUR_AUTH_GET_API = `https://api.imgur.com/oauth2/authorize?response_type=token&client_id=${IMGUR_CLIENT_ID}`;