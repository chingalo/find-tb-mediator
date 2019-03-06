const _ = require('lodash');

const {
    getRandomDataElementValues,
    getRandomEvent
} = require('./helpers/index');

const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + new Buffer('admin:district').toString('base64')
};
const serverUrl = 'https://amr.dhis2.site/cdp_cx3';
const organisationUnitIds = ["DiszpKrYNg8", "g8upMTyEZGZ"];
const program = "PI7qwgoIpq8";
const programStage = "CcPf9cIg1zc"

startApp();

async function startApp() {
    for (const organisationUnitId of organisationUnitIds) {
        for (let index = 0; index < 2; index++) {
            const dataValues = getRandomDataElementValues(program);
            const event = getRandomEvent(organisationUnitId, program, programStage, dataValues);
            console.log(JSON.stringify(event))
        }
    }
}