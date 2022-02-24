const transformationDate = date => {
  const newDate = new Date(
    date.split('.')[2],
    date.split('.')[1] - 1,
    date.split('.')[0],
    new Date().getHours(),
    new Date().getMinutes(),
    new Date().getSeconds(),
  );
  const month = newDate.getUTCMonth() + 1;
  const year = newDate.getFullYear();
  return { newDate, month, year };
};

module.exports = transformationDate;
