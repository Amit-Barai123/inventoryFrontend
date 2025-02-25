import moment from 'moment';

export const DateFormatter = (dateString, includeTime = false) => {
  const date = moment(dateString);

  if (!date.isValid()) return 'Invalid Date'; // Handle invalid date

  const format = includeTime ? 'MMM D, YYYY h:mm A' : 'MMM D, YYYY'; // Format for date with and without time

  return date.format(format);
};


