const _ = require('lodash');

function getEventDate(errorDate) {
    const eventDate = errorDate.trim().split(" ")[0].split("/").reverse().join("-") || new Date().toISOString().split("T")[0];;
    return eventDate
}

function getNewObject() {
    var newData = []
    var data = []
    for (const d of data) {
        const errorDate = d["Error datetime"];
        const eventDate = getEventDate(errorDate);
        newData = newData.concat({
            ...d,
            eventDate,
            completedDate: eventDate
        })

    }
    return newData
}

getNewObject()

module.exports = {
    getRandomDataElementValues
}