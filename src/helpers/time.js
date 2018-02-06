import moment from 'moment';

// returns human readable time/date comparable to the current time
export function timestampToHumanDate(timestamp: number) {
    let time = '';
    const now = moment();
    if (now.format('YYYY') !== moment(timestamp).format('YYYY')) {
        time = moment(timestamp).format('D MMM YYYY');
    } else if (now.format('D MMM') !== moment(timestamp).format('D MMM')) {
        time = moment(timestamp).format('D MMM');
    } else {
        time = moment(timestamp).format('HH:mm');
    }
    return time;
}