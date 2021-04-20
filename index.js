const axios = require('axios');
const countryList = require('country-list').default;
const chalk = require('chalk');
axios.get('https://date.nager.at/Api')