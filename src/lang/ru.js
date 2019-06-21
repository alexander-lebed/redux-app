// @flow
import React from 'react';
import type { Translation } from '../types';

const translation: Translation = {
    NAVIGATION: {
        MESSAGES: 'Сообщения',
        PEOPLE: 'Люди'
    },
    COMMON: {
        SUBMIT: 'Применить',
        YES: 'Да',
        CANCEL: 'Отмена',
        OR: 'Или',
        SAVE: 'Сохранить',
        DELETE: 'Удалить',
        DELETE_CONFIRMATION: 'Подтверждение об удалении',
        NO_RESULTS: 'Нет результатов',
        LOADING: 'Загрузка...',
    },
    AUTH: {
        PASSWORD: 'Пароль',
        CONFIRM_PASSWORD: 'Подтвердить пароль',
        SHOW_PASSWORD: 'Показать пароль',
        HIDE_PASSWORD: 'Скрыть пароль',
        SHOW_PASSWORDS: 'Показать пароли',
        HIDE_PASSWORDS: 'Скрыть пароли',
        INCORRECT_CREDENTIALS: 'Электронная почта или пароль неверны',
        PLEASE_RELOGIN: 'Пожалуйста войдите еще раз',
        USER_WITH_EMAIL_ALREADY_EXIST: (email) => `Пользоветель с эл.почтой ${email} уже существует`,
        SIGN_UP_ERROR: (error) => `Ошибка при регистриции пользователя: ${error}`,
        OAUTH_ERROR: (service) => <span>Ошибка при входе с помощью {service}</span>
    },
    CONVERSATIONS: {
        SEARCH_IN_CONVERSATIONS: 'Поиск по перепискам',
        SEARCH_IN_MESSAGES: 'Поиск по сообщениям',
        NEW_CONVERSATION: 'Новая переписка',
        NO_CONVERSATIONS: 'У Вас пока нет сообщений',
        CREATE: 'Создать переписку',
        DELETE: 'Удалить переписку',
        DELETE_CONFIRMATION: 'Это удалит переписку для всех её участников. Продолжить?',
        DELETE_CONFIRMATION_SUCCESS: 'Переписка была удаленв',
        DELETE_CONFIRMATION_ERROR: 'Ошибка при удалении переписки:',
        CONVERSATION_NOT_FOUND: 'Переписка не найдена'
    },
    MESSAGES: {
        MESSAGES: 'Переписка',
        MESSAGE_FROM: (senders) => `Сообщение от ${senders}`,
        MANAGE_MEMBERS: 'Изменить участников',
        WRITE_MESSAGE: 'Напишите сообщение',
        WRITE_MESSAGE_INFO: <span>Зажмите <strong>Shift+Enter</strong> для перехода на след. линию, <strong>Enter</strong> для отправки сообщения</span>,
        SENDING: 'отправляется...',
        PICK_EMOJI: 'выберите смайлик…',
        DELETE: 'Удалить сообщение',
        NEW_MESSAGE: (messagesCount: number) => `${messagesCount} ${messagesCount > 1 ? 'новых сообщений' : 'новое сообщение'}`,
        NEW_MEMBERS_NOTE: 'Новые участники будут видеть всю историю сообщений',
        MEMBERS_EDITED: (usernames: Array<string>) => <span>В этой переписке {usernames.join(', ')}</span>,
        YOU_NOT_MEMBER: 'Вы были удалены из этой переписке'
    },
    PEOPLE: {
        SEARCH_PEOPLE: 'Поиск людей',
        WRITE_MESSAGE: 'Написать сообщение',
        LAST_SEEN: 'заходил(а)',
        DELETE_CONFIRMATION: 'Вы действительно хотите удалить этого пользователя?',
        USER_DELETED: 'Пользователь был удален',
        USER_DELETE_ERROR: 'Ошибка при удалении пользователя:'
    },
    ACCOUNT: {
        SIGN_UP: 'Регистрация',
        SIGN_UP_WITH: 'Войдите через',
        LOG_IN: 'Войти',
        LOG_OUT: 'Выйти',
        ABOUT_DEVELOPER: 'О разработчике',
        EDIT_PROFILE: 'Изменить профиль',
        EDIT_PROFILE_ERROR: 'Ошибка при изменении профиля:',
        PROFILE_UPDATED: 'Твой профиль был обновлен',
        USERNAME_EMAIL: {
            USERNAME_AND_EMAIL: 'Имя и электронная почта',
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
            PASSWORD: 'Пароль',
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
            PROFILE: 'профиль',
            PICTURE: 'Фотография',
            OR_USE_FROM: 'Или загрузить с',
            SOCIAL_PICTURE: 'Или используйте фотограцию из соц.сетей:',
            UPLOAD_FAIL: 'Ошибка при загрузке файла'
        },
        DELETE_PROFILE: 'Удалить профиль',
        DELETE_PROFILE_CONFIRMATION: 'Вы действительно хотите удалить свой профиль?',
    },
    CV: {
        BASIC_INFO: {
            NAME: 'Александр Лебедь',
            YEARS: 'лет',
            ADDRESS: 'Одесса, Украина',
            SHOW_BIRTHDAY: 'Показать день рождения',
            SHOW_ON_MAP: 'Показать на карте',
            POSITION: 'Frontend разработчик',
            ABOUT_ME: 'Шестилетний практический опыт эффективного программирования на back и front-end, в основном в веб-разработке.',
            PERSONAL_SKILLS: 'Я проактивный, аккуратный, внимательный, быстро учусь, гибок к изменениям.',
            MY_GOALS: 'Готов переехать в Испанию (Валенсия/Барселона).',
            PRINT: 'Распечатать',
        },
        CONTACTS: 'Контакты',
        SKILLS: 'Навыки',
        EXPERIENCE: 'Опыт',
    },
    DATE: {
        TODAY: 'сегодня',
        TOMORROW: 'завтра',
        YESTERDAY: 'вчера',
    },
    OTHER: {
        NO_CONNECTION: 'Пожалуйста проверьте соединение с интернетом',
        HOME: 'Главную',
        PAGE_NOT_FOUND: (homeLink) => <span>Я не могу найти то, что вы ищете.<br/>Может перейдем на {homeLink} страницу?</span>
    }
};

export default translation;