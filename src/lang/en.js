// @flow
import React from 'react';

export type TranslationType = {
    SECTIONS: {
        MESSAGES: string,
        PEOPLE: string,
        WEATHER: string
    },
    COMMON: {
        YES: string,
        CANCEL: string,
        SAVE: string,
        DELETE: string,
        NO_RESULTS: string,
        DELETE_CONFIRMATION: string,
    },
    LOGIN: {
        INCORRECT_CREDENTIALS: string,
        OAUTH_ERROR: (service: any) => any,
    },
    CONVERSATIONS: {
        CONVERSATIONS: string,
        NO_CONVERSATIONS: string,
        CREATE: string,
        SEARCH_PARTICIPANTS: string,
        DELETE: string,
        DELETE_CONFIRMATION: string
    },
    MESSAGES: {
        MESSAGES: string,
        WRITE_MESSAGE: string,
        WRITE_MESSAGE_INFO: any,
        PICK_EMOJI: string,
        DELETE: string
    },
    PEOPLE: {
        SEARCH_PEOPLE: string,
        WRITE_MESSAGE: string,
        LAST_SEEN: string,
        DELETE_CONFIRMATION: string
    },
    WEATHER: {
        SEARCH_LOCATION: string,
        NO_LOCATIONS: string,
        NOT_AVAILABLE: string
    },
    ACCOUNT: {
        SIGN_UP: string,
        LOG_IN: string,
        LOG_IN_WITH_OAUTH: string,
        LOG_OUT: string,
        EDIT_PROFILE: string,
        USERNAME_EMAIL: {
            CHANGE_USERNAME_AND_EMAIL: string,
            USERNAME: string,
            EMAIL: string,
            ERRORS: {
                USERNAME_MIN_LENGTH: string,
                USERNAME_EXIST: string,
                EMAIL_INVALID: string,
                EMAIL_EXIST: string
            }
        },
        PASSWORD: {
            CHANGE_PASSWORD: string,
            CURRENT_PASSWORD: string,
            NEW_PASSWORD: string,
            CONFIRM_NEW_PASSWORD: string,
            ERRORS: {
                CURRENT_PASSWORD_INVALID: string,
                NEW_PASSWORD_INVALID: string,
                PASSWORDS_NOT_MATCH: string,
            }
        },
        PROFILE_PICTURE: {
            UPLOAD_PICTURE: string,
            SOCIAL_PICTURE: string,
            SET_PICTURE_URL: string,
            CREATE_PICTURE_URL: string,
            GO_TO_SOURCE: (s1: any, s2: any) => any,
            UPLOAD: string,
            GET_LINK: string
        },
        DELETE_PROFILE: string,
        DELETE_PROFILE_CONFIRMATION: string,
    },
    DATE: {
        TODAY: string,
        TOMORROW: string,
        YESTERDAY: string,
    }
}

const translation: TranslationType = {
    SECTIONS: {
        MESSAGES: 'Messages',
        PEOPLE: 'People',
        WEATHER: 'Weather'
    },
    COMMON: {
        YES: 'Yes',
        CANCEL: 'Cancel',
        SAVE: 'Save',
        DELETE: 'Delete',
        DELETE_CONFIRMATION: 'Delete confirmation',
        NO_RESULTS: 'No results',
    },
    LOGIN: {
        INCORRECT_CREDENTIALS: 'Email or password is incorrect',
        OAUTH_ERROR: (service) => <span>Error on login with {service}</span>
    },
    CONVERSATIONS: {
        CONVERSATIONS: 'Conversations',
        NO_CONVERSATIONS: 'You don\'t have any conversations yet',
        CREATE: 'Create conversation',
        SEARCH_PARTICIPANTS: 'Search participants',
        DELETE: 'Remove conversation',
        DELETE_CONFIRMATION: 'This will delete conversation for all participants. Are you sure?'
    },
    MESSAGES: {
        MESSAGES: 'Messages',
        WRITE_MESSAGE: 'Write a message...',
        WRITE_MESSAGE_INFO: <span>Press <strong>Shift+Enter</strong> for next line, <strong>Enter</strong> to send message</span>,
        PICK_EMOJI: 'pick your emoji…',
        DELETE: 'Remove message'
    },
    PEOPLE: {
        SEARCH_PEOPLE: 'Search people',
        WRITE_MESSAGE: 'Write a message',
        LAST_SEEN: 'last seen',
        DELETE_CONFIRMATION: 'Are you sure you want to delete this user?'
    },
    WEATHER: {
        SEARCH_LOCATION: 'Search for a location',
        NO_LOCATIONS: 'There are no locations yet.',
        NOT_AVAILABLE: 'not available'
    },
    ACCOUNT: {
        SIGN_UP: 'Sign up',
        LOG_IN: 'Log in',
        LOG_IN_WITH_OAUTH: 'Or log in with:',
        LOG_OUT: 'Log out',
        EDIT_PROFILE: 'Edit profile',
        USERNAME_EMAIL: {
            CHANGE_USERNAME_AND_EMAIL: 'Change username and email:',
            USERNAME: 'Username',
            EMAIL: 'Email',
            ERRORS: {
                USERNAME_MIN_LENGTH: 'Username should contain at least 3 characters',
                USERNAME_EXIST: 'User with such username already exist',
                EMAIL_INVALID: 'Email address should be valid',
                EMAIL_EXIST: 'User with such email already exist'
            }
        },
        PASSWORD: {
            CHANGE_PASSWORD: 'Change password:',
            CURRENT_PASSWORD: 'Current password',
            NEW_PASSWORD: 'New password',
            CONFIRM_NEW_PASSWORD: 'Confirm new password',
            ERRORS: {
                CURRENT_PASSWORD_INVALID: 'Current password does not match',
                NEW_PASSWORD_INVALID: 'Password should contain at least 5 characters and do not contain spaces',
                PASSWORDS_NOT_MATCH: 'Passwords do not match',
            }
        },
        PROFILE_PICTURE: {
            UPLOAD_PICTURE: 'Upload profile picture:',
            SOCIAL_PICTURE: 'Or use your social picture from:',
            SET_PICTURE_URL: 'Picture URL',
            CREATE_PICTURE_URL: 'To create a URL to your picture:',
            GO_TO_SOURCE: (source) => <span>Go to {source}</span>,
            UPLOAD: 'Choose an image (preferably square)',
            GET_LINK: 'Copy-paste Direct Link'
        },
        DELETE_PROFILE: 'Delete Profile',
        DELETE_PROFILE_CONFIRMATION: 'Are you sure you want to delete your profile?',
    },
    DATE: {
        TODAY: 'today',
        TOMORROW: 'tomorrow',
        YESTERDAY: 'yesterday',
    }
};

export default translation;