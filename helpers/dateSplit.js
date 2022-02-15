const dateSplit = date => {
  const month = date.split('.')[1];
  const year = date.split('.')[2];

  return { month, year };
};

module.exports = dateSplit;
