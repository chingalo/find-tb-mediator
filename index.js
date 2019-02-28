const _ = require('lodash');

const {
    getIndicatorsByGroup,
    getNumeratorsAndDenominatorsDataElementsByIndicators,
    getOrganisationUnitsByLevel,
    getDataValueSetsForGivenYear,
    uploadDataValuesToTheServer,
    getMonthInIsoFormat,
    getYearsForRandomData
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
    console.log("Loading indicatos")
    const indicators = await getIndicatorsByGroup(serverUrl, headers, indicatorGroupId);
    console.log(`Loading organisation units : level ${ouLevel}`);
    const organisationUnits = await getOrganisationUnitsByLevel(serverUrl, headers, ouLevel);
    const {
        numeratorDataElements,
        denominatorDataElements
    } = getNumeratorsAndDenominatorsDataElementsByIndicators(indicators);
    const years = getYearsForRandomData();
    for (const year of years) {
        const periods = getMonthInIsoFormat(year);
        let dataValues = []
        console.log(`Preparing data for ${year}`);
        for (const organisationUnit of organisationUnits) {
            const numeratorDataElementPayload = await getDataValueSetsForGivenYear(numeratorDataElements, organisationUnit, periods);
            const denominatorDataElementPayload = await getDataValueSetsForGivenYear(denominatorDataElements, organisationUnit, periods, 60, 100);
            dataValues = dataValues.concat(numeratorDataElementPayload.dataValues);
            dataValues = dataValues.concat(denominatorDataElementPayload.dataValues);
        }
        console.log(`Uploading data for ${year} : ` + dataValues.length);

        // await uploadDataValuesToTheServer(serverUrl,headers,)
    }




}