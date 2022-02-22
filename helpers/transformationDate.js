const transformationDate = date => {
  const splitDate = `${date.split('.')[2]}.${date.split('.')[1]}.${
    date.split('.')[0]
  }`;

  const newDate = new Date(splitDate);
  const month = newDate.getUTCMonth() + 1;
  const year = newDate.getFullYear();
  return { newDate, month, year };
};

module.exports = transformationDate;
