const axios = require('axios');

const fetchData = async (req, res, next) => {
  console.log('fetchData');
  try {
    const currencyData = await axios.get(
      'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11',
    );
    console.log('currencyData: ', currencyData);
    const filteredData = currencyData.data.filter(el => el.ccy !== 'BTC');
    res.json(filteredData);
  } catch (error) {
    next(error);
  }
};

module.exports = fetchData;
