#!/usr/bin/env node

const axios = require('axios').default;
const { getCode } = require('country-list');
const chalk = require('chalk');
const ora = require('ora');
const spinner = ora('Loading dates').start();
const figlet = require('figlet');


setTimeout(() => {
    spinner.color = 'yellow';
    spinner.text = 'Loading dates';
}, 1000);

let arguments = process.argv;
let country = arguments[2];
var year = arguments[3];
let date = new Date();
let thisYear = date.getFullYear();
var countryCode = getCode(country);

console.log(
    chalk.yellow(
        figlet.textSync('Holidates', { horizontalLayout: 'full' })
    )
);

if (year === undefined) {var year = thisYear};
if (countryCode === undefined) {
    console.log(chalk.bold.red("Your country is undefined"));
}
else {
    axios.get(`https://date.nager.at/api/v2/PublicHolidays/${year}/${countryCode}`)

        .then(response => {
            response.data.forEach(holiday => {
                console.log(chalk.yellow(holiday.name) + " - " + chalk.white.bold(holiday.date));
            });
        })
        .catch(error => {
            console.log(chalk.bold.red(error));
        });
}
