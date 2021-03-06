const request = require('request');
const Promise = require('promise');

async function getOrganisationUnitsByLevel(serverUrl, headers, level) {
    const url = `${serverUrl}/api/organisationUnits.json?fileds=id,name&filter=level:eq:${level}&paging=false`;
    return new Promise(resolve => {
        request({
                headers,
                uri: url,
                method: 'GET'
            },
            (error, response, body) => {
                if (!error && response && response.statusCode === 200) {
                    body = JSON.parse(body);
                    const {
                        organisationUnits
                    } = body;
                    resolve(
                        organisationUnits
                    );
                } else {
                    resolve([]);
                }
            }
        );
    })
}

module.exports = {
    getOrganisationUnitsByLevel
}