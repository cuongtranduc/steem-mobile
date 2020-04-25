import moment from 'moment';

export const fromNow = (time) => moment(time).fromNow();

export const longDateFormat = (time) => moment(time).format("MMM DD YYYY");