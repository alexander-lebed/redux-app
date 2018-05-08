// @flow
import moment from 'moment';

// returns human readable time/date comparable to the current time
export function timestampToHumanDate(timestamp: number | null, exactTime: boolean = false) {
    if (!timestamp) {
        return '';
    }
    let time = '';
    const now = moment();
    if (now.format('YYYY') !== moment(timestamp).format('YYYY')) {
        time = moment(timestamp).format(`D MMM YYYY${exactTime ? '[,] HH:mm' : ''}`);
    } else if (now.format('D MMM') !== moment(timestamp).format('D MMM')) {
        const dateTime = `D MMM${exactTime ? '[,] HH:mm' : ''}`;
        time = moment(timestamp).calendar(null, {
            sameDay: `[today${exactTime ? ',] HH:mm' : ']'}`,
            nextDay: `[tomorrow${exactTime ? ',] HH:mm' : ']'}`,
            nextWeek: dateTime,
            lastDay: `[yesterday${exactTime ? ',] HH:mm' : ']'}`,
            lastWeek: dateTime,
            sameElse: dateTime
        });
    } else {
        time = moment(timestamp).from(now);
    }
    return time;
}