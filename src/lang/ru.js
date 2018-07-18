// @flow
import React from 'react';
import type { Translation } from '../types';

const translation: Translation = {
    SECTIONS: {
        MESSAGES: 'Сообщения',
        PEOPLE: 'Люди',
        WEATHER: 'Погода'
    },
    COMMON: {
        YES: 'Да',
        CANCEL: 'Отмена',
        SAVE: 'Сохранить',
        DELETE: 'Удалить',
        DELETE_CONFIRMATION: 'Подтверждение об удалении',
        NO_RESULTS: 'Нет результатов',

    },
    CONVERSATIONS: {
        CONVERSATIONS: 'Сообщения',
        NO_CONVERSATIONS: 'У Вас пока нет сообщений',
        CREATE: 'Создать переписку',
        SEARCH_PARTICIPANTS: 'Поиск участников',
        DELETE: 'Удалить переписку',
        DELETE_CONFIRMATION: 'Это удалит переписку для всех её участников. Продолжить?'
    },
    MESSAGES: {
        MESSAGES: 'Переписка',
        WRITE_MESSAGE: 'Напишите сообщение...',
        WRITE_MESSAGE_INFO: <span>Зажмите <strong>Shift+Enter</strong> для перехода на след. линию, <strong>Enter</strong> для отправки сообщения</span>,
        PICK_EMOJI: 'выберите смайлик…',
        DELETE: 'Удалить сообщение'
    },
    PEOPLE: {
        SEARCH_PEOPLE: 'Поиск людей',
        DELETE_CONFIRMATION: 'Вы действительно хотите удалить этого пользователя?'
    },
    WEATHER: {
        SEARCH_LOCATION: 'Поиск местоположения',
        NO_LOCATIONS: 'Нет выбранных местоположений',
        NOT_AVAILABLE: 'недоступно'
    },
    ACCOUNT: {
        SIGN_UP: 'Зарегистрироваться',
        LOG_IN: 'Войти',
        LOG_OUT: 'Выйти',
        EDIT_PROFILE: 'Изменить профиль',
        USERNAME_EMAIL: {
            CHANGE_USERNAME_AND_EMAIL: 'Изменить имя и электронную почту:',
            USERNAME: 'Имя',
            EMAIL: 'Электронная почта',
            ERRORS: {
                USERNAME_MIN_LENGTH: 'Имя должно содержать не менее 3 символов',
                USERNAME_EXIST: 'Пользователь с таким именем уже существует',
                EMAIL_INVALID: 'Электронная почта должна быть правильной',
                EMAIL_EXIST: 'Пользователь с такой электронной почтой уже существует'
            }
        },
        PASSWORD: {
            CHANGE_PASSWORD: 'Изменить пароль:',
            CURRENT_PASSWORD: 'Текущий пароль',
            NEW_PASSWORD: 'Новый пароль',
            CONFIRM_NEW_PASSWORD: 'Подтвердить пароль',
            ERRORS: {
                CURRENT_PASSWORD_INVALID: 'Текущий пароль не совпадает',
                NEW_PASSWORD_INVALID: 'Пароль содержать не менее 5 символов и не содержать пробелов',
                PASSWORDS_NOT_MATCH: 'Пароли не совпадают',
            }
        },
        PROFILE_PICTURE: {
            UPLOAD_PICTURE: 'Обновить фотографию:',
            PICTURE_URL: 'Ссылка на фото',
            CREATE_PICTURE_URL: 'Чтобы создать ссылку:',
            GO_TO_SOURCE: (source1, source2) => <span>Зайди на {source1} или {source2}</span>,
            UPLOAD: 'Загрузите фото (предпочтительно квадратное)',
            GET_LINK: 'Скопируйте Прямую ссылку и вставьте в поле выше',
            ERRORS: {
                INVALID_URL: 'Ссылка должна быть правильной'
            }
        },
        DELETE_PROFILE: 'Удалить профиль',
        DELETE_PROFILE_CONFIRMATION: 'Вы действительно хотите удалить свой профиль?',
    }
};

export default translation;