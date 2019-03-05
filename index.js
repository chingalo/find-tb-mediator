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
// 

async function startApp() {
    console.log("Loading indicators")
    //const indicators = await getIndicatorsByGroup(serverUrl, headers, indicatorGroupId);
    console.log(`Loading organisation units : level ${ouLevel}`);
    const organisationUnits = await getOrganisationUnitsByLevel(serverUrl, headers, ouLevel);
    // const {
    //     numeratorDataElements,
    //     denominatorDataElements
    // } = getNumeratorsAndDenominatorsDataElementsByIndicators(indicators);
    const denominatorDataElements = ["oktPY3vrCNQ"];
    const numeratorDataElements = ["KbqCqIfUYFm"];
    // oktPY3vrCNQ - 10000 20000
    // KbqCqIfUYFm - 20000, 50000
    const years = getYearsForRandomData();
    for (const year of years) {
        const periods = getMonthInIsoFormat(year);
        let dataValues = []
        console.log(`Preparing data for ${year}`);
        for (const organisationUnit of organisationUnits) {
            const numeratorDataElementPayload = await getDataValueSetsForGivenYear(numeratorDataElements, organisationUnit.id, periods, 20000, 50000);
            const denominatorDataElementPayload = await getDataValueSetsForGivenYear(denominatorDataElements, organisationUnit.id, periods, 10000, 20000);
            dataValues = dataValues.concat(numeratorDataElementPayload.dataValues);
            dataValues = dataValues.concat(denominatorDataElementPayload.dataValues);
        }
        const dataValuesArray = _.chunk(dataValues, dataValues.length / 5);
        let batch = 1;
        for (const data of dataValuesArray) {
            console.log(`Uploading data for ${year} : ` + data.length + " batch " + batch + " of " + dataValuesArray.length);
            const {
                importCount,
            } = await uploadDataValuesToTheServer(serverUrl, headers, {
                dataValues: data
            });
            console.log(JSON.stringify(importCount));
            console.log("")
            batch++;
        }


    }




}