// const dateSplit = date => {
//   const month = date.split('.')[1];
//   const year = date.split('.')[2];

//   return { month, year };
// };
const transformationDate = date => {
  const splitDate = `${date.split('.')[2]}.${date.split('.')[1]}.${
    date.split('.')[0]
  }`;

  const newDate = new Date(splitDate);

  // console.log(d.toLocaleDateString());

  const month = newDate.getUTCMonth() + 1;
  const year = newDate.getFullYear();

  return { newDate, month, year };
};

module.exports = transformationDate;
