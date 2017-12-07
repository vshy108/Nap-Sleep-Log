// @flow
import Moment from 'moment';

// eslint-disable-next-line import/prefer-default-export
export function displayDateTime(timestamp: number) {
  return Moment(timestamp)
    .utcOffset(8)
    .format('YYYY-MM-DD(ddd) hh:mm(A) Z');
}
