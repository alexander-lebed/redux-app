// @flow
import React from 'react';
import type { Translation } from '../types';

const translation: Translation = {
    SECTIONS: {
        MESSAGES: 'Сообщения',
        PEOPLE: 'Люди',
    },
    COMMON: {
        YES: 'Да',
        CANCEL: 'Отмена',
        SAVE: 'Сохранить',
        DELETE: 'Удалить',
        DELETE_CONFIRMATION: 'Подтверждение об удалении',
        NO_RESULTS: 'Нет результатов',
    },
    LOGIN: {
        PASSWORD: 'Пароль',
        CONFIRM_PASSWORD: 'Подтвердить пароль',
        INCORRECT_CREDENTIALS: 'Электронная почта или пароль неверны',
        OAUTH_ERROR: (service) => <span>Error on login with {service}</span>
    },
    CONVERSATIONS: {
        CONVERSATIONS: 'Сообщения',
        NO_CONVERSATIONS: 'У Вас пока нет сообщений',
        CREATE: 'Создать переписку',
        SEARCH_PEOPLE: 'Поиск участников',
        DELETE: 'Удалить переписку',
        DELETE_CONFIRMATION: 'Это удалит переписку для всех её участников. Продолжить?',
        CONVERSATION_REMOVED: 'Переписка удалена'
    },
    MESSAGES: {
        MESSAGES: 'Переписка',
        ADD_PEOPLE: 'Добавить участника',
        WRITE_MESSAGE: 'Напишите сообщение...',
        WRITE_MESSAGE_INFO: <span>Зажмите <strong>Shift+Enter</strong> для перехода на след. линию, <strong>Enter</strong> для отправки сообщения</span>,
        PICK_EMOJI: 'выберите смайлик…',
        DELETE: 'Удалить сообщение',
        NEW_MEMBERS_NOTE: 'Новые участники будут видеть всю историю сообщений',
        MEMBERS_ADDED: (usernames: Array<string>) => <span>{usernames.join(', ')} {usernames.length === 1 ? ' был(а) добавлен(а)' : ' были добавлены'}</span>
    },
    PEOPLE: {
        SEARCH_PEOPLE: 'Поиск людей',
        WRITE_MESSAGE: 'Написать сообщение',
        LAST_SEEN: 'заходил(а)',
        DELETE_CONFIRMATION: 'Вы действительно хотите удалить этого пользователя?'
    },
    ACCOUNT: {
        SIGN_UP: 'Регистрация',
        LOG_IN: 'Войти',
        LOG_IN_WITH_OAUTH: 'Или войти через:',
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
            SOCIAL_PICTURE: 'Или используйте фотограцию из соц.сетей:',
            SET_PICTURE_URL: 'Ссылка на фото',
            CREATE_PICTURE_URL: 'Чтобы создать ссылку:',
            GO_TO_SOURCE: (source) => <span>Зайдите на {source}</span>,
            UPLOAD: 'Выбирите изображение (предпочтительно квадратное)',
            GET_LINK: 'Скопируйте и вставьте прямую ссылку (Direct link)'
        },
        DELETE_PROFILE: 'Удалить профиль',
        DELETE_PROFILE_CONFIRMATION: 'Вы действительно хотите удалить свой профиль?',
    },
    DATE: {
        TODAY: 'сегодня',
        TOMORROW: 'завтра',
        YESTERDAY: 'вчера',
    }
};

export default translation;