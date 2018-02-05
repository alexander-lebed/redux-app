/* eslint-disable no-useless-escape */

export function getUsernameValidationState(username = '') {
    if (username.length === 0) {
        return null;
    } else if (username.length >= 3) {
        return 'success';
    } else if (username.length < 3) {
        return 'error';
    }
}

export function getEmailValidationState(email = '') {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.length === 0) {
        return null;
    } else if (re.test(email)) {
        return 'success';
    } else {
        return 'error';
    }
}

export function getPasswordValidationState(password = '') {
    if (password.length === 0) {
        return null;
    } else if (password.length >= 5) {
        return 'success';
    } else if (password.length < 5) {
        return 'error';
    }
}

export function getConfirmPasswordValidationState(password = '', confirmPassword = '') {
    if (password.length === 0 || confirmPassword.length === 0) {
        return null;
    } else if (password === confirmPassword) {
        return 'success';
    } else {
        return 'error';
    }
}