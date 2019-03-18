// @flow
import moment from 'moment';
import type { Translation } from '../../types';

// returns human readable time/date comparable to the current time
export default function timestampToHumanDate(timestamp: number | null, exactTime: boolean = false, translation: Translation) {
    if (!timestamp) {
        return '';
    }
    let time = '';
    const now = moment();
    if (now.format('YYYY') !== moment(timestamp).format('YYYY')) {
        time = moment(timestamp).format(`D MMM YYYY${exactTime ? '[,] HH:mm' : ''}`);
    } else if (now.format('D MMM') !== moment(timestamp).format('D MMM')) {
        const {DATE} = translation;
        const dateTime = `D MMM${exactTime ? '[,] HH:mm' : ''}`;
        time = moment(timestamp).calendar(null, {
            sameDay: `[${DATE.TODAY}${exactTime ? ',] HH:mm' : ']'}`,
            nextDay: `[${DATE.TOMORROW}${exactTime ? ',] HH:mm' : ']'}`,
            nextWeek: dateTime,
            lastDay: `[${DATE.YESTERDAY}${exactTime ? ',] HH:mm' : ']'}`,
            lastWeek: dateTime,
            sameElse: dateTime
        });
    } else {
        time = moment(timestamp).from(now);
    }
    return time;
}