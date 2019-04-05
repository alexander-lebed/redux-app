/* eslint-disable no-useless-escape */
// @flow

export function isUsernameInvalid(username: string = ''): boolean {
    if (username.length === 0 || username.length >= 3) {
        return false;
    } else if (username.length < 3) {
        return true;
    }
}

export function isEmailInvalid(email: string = ''): boolean {
    const emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !(email.length === 0 || emailRegEx.test(email));
}

export function isPasswordInvalid(password: string = ''): boolean {
    return !(password.length === 0 || (password.length >= 5 && /^\S*$/.test(password)))
}

export function isConfirmPasswordInvalid(password: string = '', confirmPassword: string = ''): boolean {
    if (password.length === 0 || confirmPassword.length === 0) {
        return false;
    }
    return password !== confirmPassword;
}

// export function getUrlValidationState(url = '') {
//     if (url.length === 0) {
//         return null;
//     }
//     const expr = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
//     return expr.test(url) ? 'success' : 'error';
// }