// @flow
import CryptoJS from 'crypto-js';

const secretKey = 'key999';
const encryptPassword = (password: string): string => CryptoJS.SHA256(password, secretKey).toString();

export default encryptPassword;