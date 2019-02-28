const request = require('request');
const Promise = require('promise');
const _ = require('lodash');

async function uploadDataValuesToTheServer(serverUrl, headers, payLoad) {
    const url = `${serverUrl}/api/dataValueSets.json`;
    return new Promise(resolve => {
        request({
                headers,
                uri: url,
                method: 'POST',
                body: JSON.stringify(payLoad)
            },
            (error, response, body) => {
                body = JSON.parse(body);
                const {
                    status
                } = body;
                const {
                    importCount
                } = body;
                const {
                    conflicts
                } = body;
                resolve({
                    conflicts,
                    importCount,
                    status
                });
            }
        );
    });
}

async function getDataValueSetsForGivenYear(dataElements, orgUnit, periods, start, end) {
    return new Promise(resolve => {
        const dataValues = [];
        for (const dataElement of dataElements) {
            for (const period of periods) {
                const dataValue = getDataValueObject(dataElement, period, orgUnit, start, end);
                dataValues.push(dataValue)
            }
        }
        resolve({
            dataValues
        })
    })
}

function getDataValueObject(dataElement, period, orgUnit, start, end) {
    const value = (start && end) ? _.random(start, end) : _.random(20, 50);
    return {
        'dataElement': `${dataElement}`,
        'period': `${period}`,
        'orgUnit': `${orgUnit}`,
        'categoryOptionCombo': '',
        'attributeOptionCombo': '',
        'value': `${value}`,
        'storedBy': 'admin',
        'created': '2017-06-01T11:35:56.000+0000',
        'lastUpdated': '2017-05-22T21:50:23.000+0000',
        'comment': '',
        'followup': false
    }
}

module.exports = {
    getDataValueSetsForGivenYear,
    uploadDataValuesToTheServer
}