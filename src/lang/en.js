// @flow
import React from 'react';

export type TranslationType = {
    NAVIGATION: {
        MESSAGES: string,
        PEOPLE: string,
    },
    COMMON: {
        SUBMIT: string,
        YES: string,
        CANCEL: string,
        OR: string,
        VIA: string,
        SAVE: string,
        DELETE: string,
        NO_RESULTS: string,
        DELETE_CONFIRMATION: string,
        LOADING: string,
    },
    AUTH: {
        PASSWORD: string,
        CONFIRM_PASSWORD: string,
        SHOW_PASSWORD: string,
        HIDE_PASSWORD: string,
        SHOW_PASSWORDS: string,
        HIDE_PASSWORDS: string,
        INCORRECT_CREDENTIALS: string,
        PLEASE_RELOGIN: string,
        USER_WITH_EMAIL_ALREADY_EXIST: (email: string) => string,
        SIGN_UP_ERROR: (error: string) => string,
        OAUTH_ERROR: (service: any) => any,
    },
    CONVERSATIONS: {
        SEARCH_IN_CONVERSATIONS: string,
        SEARCH_IN_MESSAGES: string,
        NEW_CONVERSATION: string,
        NO_CONVERSATIONS: string,
        CREATE: string,
        DELETE: string,
        DELETE_CONFIRMATION: string,
        DELETE_CONFIRMATION_SUCCESS: string,
        DELETE_CONFIRMATION_ERROR: string,
        CONVERSATION_NOT_FOUND: string
    },
    MESSAGES: {
        MESSAGES: string,
        MESSAGE_FROM: (senders: string) => string,
        MANAGE_MEMBERS: string,
        WRITE_MESSAGE: string,
        WRITE_MESSAGE_INFO: any,
        SENDING: string,
        PICK_EMOJI: string,
        DELETE: string,
        NEW_MESSAGE: (messagesCount: number) => string,
        NEW_MEMBERS_NOTE: string,
        MEMBERS_EDITED: string,
        YOU_NOT_MEMBER: string
    },
    PEOPLE: {
        SEARCH_PEOPLE: string,
        WRITE_MESSAGE: string,
        LAST_SEEN: string,
        DELETE_CONFIRMATION: string,
        USER_DELETED: string,
        USER_DELETE_ERROR: string
    },
    ACCOUNT: {
        SIGN_UP: string,
        SIGN_UP_WITH: string,
        LOG_IN: string,
        LOG_OUT: string,
        ABOUT_DEVELOPER: string,
        EDIT_PROFILE: string,
        EDIT_PROFILE_ERROR: string,
        PROFILE_UPDATED: string,
        USERNAME_EMAIL: {
            USERNAME_AND_EMAIL: string,
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
            PASSWORD: string,
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
            PROFILE: string,
            PICTURE: string,
            OR_USE_FROM: string,
            SOCIAL_PICTURE: string,
            UPLOAD_FAIL: string,
        },
        DELETE_PROFILE: string,
        DELETE_PROFILE_CONFIRMATION: string,
    },
    CV: {
        BASIC_INFO: {
            NAME: string,
            YEARS: string,
            ADDRESS: string,
            SHOW_BIRTHDAY: string,
            SHOW_ON_MAP: string,
            POSITION: string,
            ABOUT_ME: string,
            PERSONAL_SKILLS: string,
            MY_GOALS: string,
            PRINT: string,
        },
        CONTACTS: string,
        SKILLS: string,
        EXPERIENCE: string,
    },
    DATE: {
        TODAY: string,
        TOMORROW: string,
        YESTERDAY: string,
    },
    OTHER: {
        NO_CONNECTION: string,
        HOME: string,
        PAGE_NOT_FOUND: (homeLink: any) => any
    }
}

const translation: TranslationType = {
    NAVIGATION: {
        MESSAGES: 'Messages',
        PEOPLE: 'People'
    },
    COMMON: {
        SUBMIT: 'Submit',
        YES: 'Yes',
        CANCEL: 'Cancel',
        OR: 'Or',
        SAVE: 'Save',
        DELETE: 'Delete',
        DELETE_CONFIRMATION: 'Delete confirmation',
        NO_RESULTS: 'No results',
        LOADING: 'Loading...',
    },
    AUTH: {
        PASSWORD: 'Password',
        CONFIRM_PASSWORD: 'Confirm password',
        SHOW_PASSWORD: 'Show password',
        HIDE_PASSWORD: 'Hide password',
        SHOW_PASSWORDS: 'Show passwords',
        HIDE_PASSWORDS: 'Hide passwords',
        INCORRECT_CREDENTIALS: 'Email or password is incorrect',
        PLEASE_RELOGIN: 'Please re-login',
        USER_WITH_EMAIL_ALREADY_EXIST: (email) => `User with ${email} email already exist`,
        SIGN_UP_ERROR: (error) => `Error on sign up user: ${error}`,
        OAUTH_ERROR: (service) => <span>Error on login with {service}</span>
    },
    CONVERSATIONS: {
        SEARCH_IN_CONVERSATIONS: 'Search conversations',
        SEARCH_IN_MESSAGES: 'Search messages',
        NEW_CONVERSATION: 'New conversation',
        NO_CONVERSATIONS: 'You don\'t have any conversations yet',
        CREATE: 'Create conversation',
        DELETE: 'Remove conversation',
        DELETE_CONFIRMATION: 'This will delete conversation for all participants. Okay?',
        DELETE_CONFIRMATION_SUCCESS: 'Conversation has been deleted',
        DELETE_CONFIRMATION_ERROR: 'Error on delete conversation:',
        CONVERSATION_NOT_FOUND: 'Conversation is not found'
    },
    MESSAGES: {
        MESSAGES: 'Messages',
        MESSAGE_FROM: (senders) => `Message from ${senders}`,
        MANAGE_MEMBERS: 'Manage members',
        WRITE_MESSAGE: 'Write a message',
        WRITE_MESSAGE_INFO: <span>Press <strong>Shift+Enter</strong> for next line, <strong>Enter</strong> to send message</span>,
        SENDING: 'sending...',
        PICK_EMOJI: 'pick your emoji…',
        DELETE: 'Remove message',
        NEW_MESSAGE: (messagesCount: number) => `${messagesCount} new message${messagesCount > 1 ? 's' : ''}`,
        NEW_MEMBERS_NOTE: 'New members will see the whole message history',
        MEMBERS_EDITED: (usernames: Array<string>) => <span>In this conversation {usernames.join(', ')}</span>,
        YOU_NOT_MEMBER: 'You have been removed from this conversation'
    },
    PEOPLE: {
        SEARCH_PEOPLE: 'Search people',
        WRITE_MESSAGE: 'Write a message',
        LAST_SEEN: 'last seen',
        DELETE_CONFIRMATION: 'Are you sure you want to delete this user?',
        USER_DELETED: 'User has been deleted',
        USER_DELETE_ERROR: 'Error on delete user:',
    },
    ACCOUNT: {
        SIGN_UP: 'Sign up',
        SIGN_UP_WITH: 'Sign up with',
        LOG_IN: 'Log in',
        LOG_OUT: 'Log out',
        ABOUT_DEVELOPER: 'About developer',
        EDIT_PROFILE: 'Edit profile',
        EDIT_PROFILE_ERROR: 'Error on update profile:',
        PROFILE_UPDATED: 'Your profile has been updated',
        USERNAME_EMAIL: {
            USERNAME_AND_EMAIL: 'Username & Email',
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
            PASSWORD: 'Password',
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
            PROFILE: 'profile',
            PICTURE: 'Profile picture',
            OR_USE_FROM: 'Or use photo from',
            SOCIAL_PICTURE: 'Or use your social media profile picture:',
            UPLOAD_FAIL: 'Cannot upload file'
        },
        DELETE_PROFILE: 'Delete Profile',
        DELETE_PROFILE_CONFIRMATION: 'Are you sure you want to delete your profile?',
    },
    CV: {
        BASIC_INFO: {
            NAME: 'Alexander Lebed',
            YEARS: 'years',
            ADDRESS: 'Odessa, Ukraine',
            SHOW_BIRTHDAY: 'Show birthday',
            SHOW_ON_MAP: 'Show on map',
            POSITION: 'Frontend Developer',
            ABOUT_ME: 'With six years of hands-on experience efficiently coding on back and front-end, mostly in web development.',
            PERSONAL_SKILLS: 'I am proactive, fast learner, accurate, eye-for-details, flexible for changes.',
            MY_GOALS: 'Willing to relocate to Spain (Valencia/Barcelona).',
            PRINT: 'Print CV',
        },
        CONTACTS: 'Contacts',
        SKILLS: 'Skills',
        EXPERIENCE: 'Experience',
    },
    DATE: {
        TODAY: 'today',
        TOMORROW: 'tomorrow',
        YESTERDAY: 'yesterday',
    },
    OTHER: {
        NO_CONNECTION: 'It seems that you are offline. Please check your internet connection',
        HOME: 'Home',
        PAGE_NOT_FOUND: (homeLink) => <span>I couldn't find what you are looking for.<br/>How about going to the {homeLink} page?</span>
    }
};

export default translation;