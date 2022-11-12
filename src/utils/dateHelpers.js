export function getDateString(date) {
  return (
    date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() + ' '
  );
}

export function getTimeString(date) {
  return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}
