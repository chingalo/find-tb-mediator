const _ = require('lodash');

const {
    getIndicatorsByGroup,
    getOrganisationUnitsByLevel
} = require('./helpers/index');

const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Basic ' + new Buffer('admin:district').toString('base64')
};
const serverUrl = 'https://amr.dhis2.site/cdp_cx3';
const indicatorGroupId = "mjkDrtFryIk";
const ouLevel = 4;

startApp();

async function startApp() {
    const indicators = await getIndicatorsByGroup(serverUrl, headers, indicatorGroupId);
    const organisationUnits = await getOrganisationUnitsByLevel(serverUrl, headers, ouLevel);
    console.log(indicators.length);
    console.log(organisationUnits.length)

}