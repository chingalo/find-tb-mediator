const request = require('request');
const Promise = require('promise');

function getEventDate() {
    const date = getRandomDate(new Date(2018, 5, 1), new Date())
    return date.split("T")[0];
}

function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

async function uploadRandomEvents(serverUrl, headers, payLoad) {
    const url = `${serverUrl}/api/events.json`;
    return new Promise(resolve => {
        request({
                headers,
                uri: url,
                method: 'POST',
                body: JSON.stringify(payLoad)
            },
            (error, responseObj, body) => {
                body = JSON.parse(body);
                const {
                    response,
                    httpStatus,
                    httpStatusCode
                } = body;
                const {
                    imported,
                    updated,
                    deleted,
                    ignored
                } = response
                resolve({
                    httpStatus,
                    httpStatusCode,
                    imported,
                    updated,
                    deleted,
                    ignored
                });
            }
        );
    });
}


function getRandomEvent(orgUnit, program, programStage, dataValues) {
    const eventDate = getEventDate();
    return {
        "program": `${program}`,
        "programStage": `${programStage}`,
        "orgUnit": `${orgUnit}`,
        "status": "COMPLETED",
        "eventDate": `${eventDate}`,
        "dataValues": dataValues,
        "completedDate": `${eventDate}`
    }

}
module.exports = {
    getRandomEvent,
    uploadRandomEvents
}