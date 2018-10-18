
export const DOCUMENT_TITLE = 'Messenger';

export const WS_ADDRESS = process.env.WS_ADDRESS;
export const API_HOST = process.env.API_HOST;
export const USERS_URL = API_HOST + '/users';
export const CONVERSATIONS_URL = API_HOST + '/conversations';
export const PLACES_URL = API_HOST + '/places';

export const MAIN_COLOR = '#00b386';
export const BORDER_COLOR = '#008060';

// export const onlineStyle = {boxShadow: `0 0 3pt 1pt ${MAIN_COLOR}`}; //20px 20px 1pt -14pt
export const onlineStyle = {boxShadow: `20px 20px 0pt -15pt ${MAIN_COLOR}`}; // 0 0 2pt 2pt lightgrey,